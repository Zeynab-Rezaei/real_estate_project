export default function SectionHead({ eyebrow, title, text, align = 'left', className = '', id }) {
  return (
    <div
      className={`section-head ${align === 'center' ? 'section-head--center' : ''} ${className}`.trim()}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="section-head__title" id={id}>
        {title}
      </h2>
      {text ? <p className="section-head__text">{text}</p> : null}
    </div>
  );
}
