import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-scrubbed hero video.
 *
 * The hero is a tall track (`.hero`) with a sticky 100vh stage (`.hero__stage`).
 * Progress through the track maps 0..1 onto the clip timeline, and the clip is
 * *seeked* — never played, never looped. All seeking happens inside one
 * requestAnimationFrame loop that eases the rendered position toward the scroll
 * position, so raw scroll events never touch `video.currentTime` directly.
 *
 * Encoding note — the clip must be encoded for random access:
 *   H.264, 1280x576, 24fps, keyframe every 4 frames (-g 4 -keyint_min 4
 *   -sc_threshold 0), CRF 20, +faststart, no audio.
 * A normal delivery encode carries a single keyframe at the start, so every seek
 * has to decode the whole clip from frame 0 and scrubbing visibly stutters.
 * Dense keyframes cost roughly a third more bytes but make every frame a cheap
 * random access. Any replacement clip should keep a GOP of 4–8, stay at or below
 * 720p, and avoid audio. `hero-desktop.webm` (VP9, same GOP) is the fallback.
 */

const SMOOTHING = 0.18; // per-frame easing toward the scroll position (~95% in 10 frames)
const SETTLE = 0.0004; // progress delta small enough to stop the loop
const MIN_SEEK_SECONDS = 0.02; // ignore sub-frame seeks; avoids seek floods
const END_EPSILON = 0.042; // one 24fps frame — seeking to exactly `duration` can paint blank
const COPY_FADE_END = 0.3; // hero copy is gone by 30% of the track
const CUE_FADE_END = 0.08;

export const HERO_VIDEO = {
  desktop: '/video/hero-desktop.mp4',
  mobile: '/video/hero-mobile.mp4',
  webm: '/video/hero-desktop.webm',
  poster: '/video/hero-poster.jpg',
};

export default function useHeroScrollVideo({ enabled, sources }) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const copyRef = useRef(null);
  const cueRef = useRef(null);
  const railRef = useRef(null);
  const loaderRef = useRef(null);
  const [status, setStatus] = useState('loading');

  const sourceKey = sources.join('|');

  useEffect(() => {
    if (!enabled) return undefined;

    const track = trackRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!track || !stage || !video) return undefined;

    const clips = sourceKey.split('|');
    const controller = new AbortController();

    let raf = 0;
    let disposed = false;
    let ready = false;
    let target = 0; // scroll-derived progress
    let current = 0; // eased progress actually rendered
    let trackTop = 0;
    let scrollRange = 1;
    let pinned = false;
    let sourceIndex = 0;
    let objectUrl = '';

    const duration = () =>
      Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;

    /* ---------- rendering ---------- */

    let copyHidden = false;
    let cueHidden = false;

    const paint = (progress) => {
      const copy = copyRef.current;
      if (copy) {
        const visible = Math.max(0, 1 - progress / COPY_FADE_END);
        // Once faded out, stop touching it — the scrub then costs one transform.
        if (visible > 0.001 || !copyHidden) {
          copy.style.opacity = visible.toFixed(3);
          copy.style.transform = `translate3d(0, ${(-28 * (1 - visible)).toFixed(1)}px, 0)`;
          copy.style.pointerEvents = visible < 0.04 ? 'none' : '';
          copyHidden = visible <= 0.001;
        }
      }
      const cue = cueRef.current;
      if (cue) {
        const visible = 1 - Math.min(1, progress / CUE_FADE_END);
        if (visible > 0.001 || !cueHidden) {
          cue.style.opacity = visible.toFixed(3);
          cueHidden = visible <= 0.001;
        }
      }
      const rail = railRef.current;
      if (rail) rail.style.transform = `scaleX(${progress.toFixed(4)})`;
    };

    const seek = (progress) => {
      const total = duration();
      if (!ready || !total) return;
      if (video.seeking) return; // one seek in flight — never queue a backlog
      // progress 1 must land on the first frame of the final frame, not on
      // `duration` itself (which can paint blank in some browsers).
      const time = progress > 0.999 ? Math.max(0, total - END_EPSILON) : progress * total;
      const tolerance = progress > 0.999 || progress < 0.001 ? 0.001 : MIN_SEEK_SECONDS;
      if (Math.abs(time - video.currentTime) < tolerance) return;
      video.currentTime = time;
    };

    const tick = () => {
      raf = 0;
      const diff = target - current;
      current += diff * SMOOTHING;
      const settled = Math.abs(diff) < SETTLE;
      if (settled) current = target;
      seek(current);
      paint(current);
      if (!settled || video.seeking) raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    /* ---------- scroll → progress ---------- */

    const readScroll = () => {
      const raw = scrollRange > 0 ? (window.scrollY - trackTop) / scrollRange : 0;
      target = raw < 0 ? 0 : raw > 1 ? 1 : raw;
      const nextPinned = target < 0.999;
      if (nextPinned !== pinned) {
        pinned = nextPinned;
        // Lets the fixed header stay transparent over the stage and turn solid
        // exactly when the stage unpins (see home.css).
        if (pinned) document.documentElement.dataset.heroPinned = 'true';
        else delete document.documentElement.dataset.heroPinned;
      }
    };

    const onScroll = () => {
      readScroll();
      kick();
    };

    const measure = () => {
      trackTop = track.getBoundingClientRect().top + window.scrollY;
      // The stage stays pinned for the track height minus its own height.
      scrollRange = Math.max(1, track.offsetHeight - stage.offsetHeight);
      readScroll();
      paint(target);
      kick();
    };

    /* ---------- media ---------- */

    const setLoaded = (ratio) => {
      const loader = loaderRef.current;
      if (loader) loader.style.setProperty('--loaded', Math.min(1, ratio).toFixed(3));
    };

    // Fetch the whole clip once into a blob so every seek is served from memory
    // instead of waiting on a range request. ~4MB, streamed with progress.
    const fetchClip = async (url) => {
      const response = await fetch(url, { signal: controller.signal, cache: 'force-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (!response.body) return response.blob();
      const total = Number(response.headers.get('content-length')) || 0;
      const reader = response.body.getReader();
      const chunks = [];
      let received = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        if (total) setLoaded(received / total);
      }
      return new Blob(chunks, { type: 'video/mp4' });
    };

    const load = () => {
      if (disposed) return;
      if (sourceIndex >= clips.length) {
        setStatus('error');
        return;
      }
      fetchClip(clips[sourceIndex])
        .then((blob) => {
          if (disposed) return;
          if (objectUrl) URL.revokeObjectURL(objectUrl);
          objectUrl = URL.createObjectURL(blob);
          video.src = objectUrl;
          video.load();
        })
        .catch(() => {
          if (disposed || controller.signal.aborted) return;
          sourceIndex += 1;
          load();
        });
    };

    const onLoadedData = () => {
      if (disposed || ready) return;
      ready = true;
      // Landing mid-hero (refresh, restored scroll) should show that frame at
      // once instead of sweeping the whole clip.
      current = target;
      paint(current);
      seek(current);
      kick();
      setStatus('ready');
    };

    const onError = () => {
      if (disposed || !video.getAttribute('src')) return;
      sourceIndex += 1;
      load();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    document.addEventListener('visibilitychange', measure);
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('error', onError);

    measure();
    load();

    return () => {
      disposed = true;
      controller.abort();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
      document.removeEventListener('visibilitychange', measure);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('error', onError);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      delete document.documentElement.dataset.heroPinned;
      video.removeAttribute('src');
    };
  }, [enabled, sourceKey]);

  return {
    trackRef,
    stageRef,
    videoRef,
    copyRef,
    cueRef,
    railRef,
    loaderRef,
    status,
  };
}
