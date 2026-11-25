import { Link } from 'react-router-dom';
import { LogoMark } from './ui/Icons.jsx';

export default function Logo({ as = Link, to = '/' }) {
  const Component = as;
  const props = as === Link ? { to } : {};
  return (
    <Component className="logo" aria-label="Horizon Properties — home" {...props}>
      <LogoMark />
      <span className="logo__text">
        <span className="logo__name">HORIZON</span>
        <span className="logo__sub">PROPERTIES</span>
      </span>
    </Component>
  );
}
