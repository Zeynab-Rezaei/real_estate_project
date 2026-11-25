import { useState } from 'react';
import { site } from '../../data/site.js';
import Photo from '../ui/Photo.jsx';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import useHeroScrollVideo, { HERO_VIDEO } from '../../hooks/useHeroScrollVideo.js';

function HeroCopy({ copyRef }) {
  return (
    <div className="hero__copy" ref={copyRef}>
      <h1 className="hero__title" id="hero-title">
        Discover Exceptional Homes &amp; Investments
      </h1>
      <p className="hero__sub">
        Premium properties in prime locations. Find your dream home or the perfect investment
        with confidence.
      </p>
    </div>
  );
}

/**
 * Cinematic hero: the scroll position drives the video timeline.
 * The clip is only ever seeked — it never plays, never loops.
 */
export default function Hero() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [saveData] = useState(() => Boolean(navigator.connection?.saveData));
  const cinematic = !reducedMotion && !saveData;

  const scrub = useHeroScrollVideo({
    enabled: cinematic,
    sources: isMobile
      ? [HERO_VIDEO.mobile, HERO_VIDEO.webm]
      : [HERO_VIDEO.desktop, HERO_VIDEO.webm],
  });

  // Reduced motion / data saver: a single static frame, no scroll choreography.
  if (!cinematic) {
    return (
      <section className="hero hero--static" aria-labelledby="hero-title">
        <div className="hero__stage">
          <div className="hero__media">
            <img className="hero__poster" src={HERO_VIDEO.poster} alt={site.heroAlt} />
          </div>
          <div className="hero__scrim" aria-hidden="true" />
          <div className="container hero__content">
            <HeroCopy />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero" aria-labelledby="hero-title" ref={scrub.trackRef}>
      <div className="hero__stage" ref={scrub.stageRef} data-state={scrub.status}>
        <div className="hero__media">
          {scrub.status === 'error' && (
            <Photo
              id={site.heroImage}
              alt={site.heroAlt}
              sizes="100vw"
              priority
              className="hero__img"
            />
          )}
          <img
            className="hero__poster"
            src={HERO_VIDEO.poster}
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchpriority="high"
          />
          <video
            className="hero__video"
            ref={scrub.videoRef}
            poster={HERO_VIDEO.poster}
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
            aria-hidden="true"
            disablePictureInPicture
            disableRemotePlayback
          />
        </div>

        <div className="hero__scrim" aria-hidden="true" />

        <div className="container hero__content">
          <HeroCopy copyRef={scrub.copyRef} />
        </div>

        <div className="hero__loader" ref={scrub.loaderRef} aria-hidden="true">
          <span className="hero__loader-track">
            <span className="hero__loader-bar" />
          </span>
          <span className="hero__loader-label">Preparing the scene</span>
        </div>

        <div className="hero__scroll" ref={scrub.cueRef} aria-hidden="true">
          <span />
          Scroll
        </div>

        <div className="hero__rail" aria-hidden="true">
          <span className="hero__rail-fill" ref={scrub.railRef} />
        </div>
      </div>
    </section>
  );
}
