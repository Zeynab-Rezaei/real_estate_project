import Photo from './Photo.jsx';

export default function PageHero({ eyebrow, title, children, image }) {
  return (
    <section className="page-hero">
      {image ? (
        <div className="page-hero__media" aria-hidden="true">
          <Photo id={image} alt="" sizes="100vw" priority />
        </div>
      ) : null}
      <div className="page-hero__scrim" aria-hidden="true" />
      <div className="container page-hero__inner">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
}
