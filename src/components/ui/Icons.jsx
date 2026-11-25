const base = {
  viewBox: '0 0 24 24',
  width: 20,
  height: 20,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
};

function Svg({ children, className = 'icon', ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      {children}
    </svg>
  );
}

export function LogoMark({ className = 'logo__mark' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.5 26.5h23" />
      <path d="M8.5 26.5V14.5l5.5-4v16" />
      <path d="M14 26.5V8.5L24 3.5v23" />
      <path d="M17.5 12h2.4M17.5 16h2.4M17.5 20h2.4M10.8 17.5h1.4" />
    </svg>
  );
}

export const ArrowRight = (props) => (
  <Svg {...props}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
);

export const ArrowLeft = (props) => (
  <Svg {...props}>
    <path d="M20 12H5" />
    <path d="m11 6-6 6 6 6" />
  </Svg>
);

export const ArrowUpRight = (props) => (
  <Svg {...props}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </Svg>
);

export const Phone = (props) => (
  <Svg {...props}>
    <path d="M6.6 3.5h2.7l1.4 3.9-1.9 1.4a12.4 12.4 0 0 0 5.6 5.6l1.4-1.9 3.9 1.4v2.7a2 2 0 0 1-2.2 2A17.3 17.3 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
  </Svg>
);

export const MapPin = (props) => (
  <Svg {...props}>
    <path d="M12 21s6.5-5.4 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.6 12 21 12 21Z" />
    <circle cx="12" cy="10.3" r="2.4" />
  </Svg>
);

export const Bed = (props) => (
  <Svg {...props}>
    <path d="M3 19v-7.2A1.8 1.8 0 0 1 4.8 10h14.4A1.8 1.8 0 0 1 21 11.8V19" />
    <path d="M3 16h18" />
    <path d="M6 10V7.6A1.6 1.6 0 0 1 7.6 6h8.8A1.6 1.6 0 0 1 18 7.6V10" />
  </Svg>
);

export const Bath = (props) => (
  <Svg {...props}>
    <path d="M4 12h16v1.8a5.2 5.2 0 0 1-5.2 5.2H9.2A5.2 5.2 0 0 1 4 13.8V12Z" />
    <path d="M6.5 12V6.6A2.1 2.1 0 0 1 10.6 6" />
    <path d="M8 19.5 7.2 21M16 19.5l.8 1.5" />
  </Svg>
);

export const Area = (props) => (
  <Svg {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 4v4H4M16 20v-4h4" />
  </Svg>
);

export const Heart = ({ filled = false, ...props }) => (
  <Svg fill={filled ? 'currentColor' : 'none'} {...props}>
    <path d="M12 20.2s-7-4.4-7-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7 3.2c0 5-7 9.4-7 9.4Z" />
  </Svg>
);

export const Menu = (props) => (
  <Svg {...props}>
    <path d="M3.5 8h17M3.5 16h17" />
  </Svg>
);

export const Close = (props) => (
  <Svg {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const Key = (props) => (
  <Svg {...props}>
    <circle cx="8" cy="8" r="4.2" />
    <path d="m11 11 8.5 8.5" />
    <path d="m16.2 16.2 2-2M13.6 13.6l2-2" />
  </Svg>
);

export const Mail = (props) => (
  <Svg {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2.2" />
    <path d="m3.6 7 8.4 5.6L20.4 7" />
  </Svg>
);

export const Search = (props) => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="6.6" />
    <path d="m20 20-3.6-3.6" />
  </Svg>
);

export const Expand = (props) => (
  <Svg {...props}>
    <path d="M4 9V4h5M20 15v5h-5M15 4h5v5M9 20H4v-5" />
  </Svg>
);

export const Check = (props) => (
  <Svg {...props}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Svg>
);

export const Calendar = (props) => (
  <Svg {...props}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Svg>
);

export const Clock = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.2V12l3.2 2" />
  </Svg>
);

export const Instagram = (props) => (
  <Svg {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="0.7" fill="currentColor" />
  </Svg>
);

export const LinkedIn = (props) => (
  <Svg {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3.2" />
    <path d="M7.6 10.4v6.2M7.6 7.4v.01M11.6 16.6v-3.6a2.4 2.4 0 0 1 4.8 0v3.6" />
  </Svg>
);

export const Facebook = (props) => (
  <Svg {...props}>
    <path d="M15 8.6h2.4V5.2H15a4 4 0 0 0-4 4v2.6H8.4V15H11v5.8h3.4V15h2.7l.4-3.2h-3.1V9.4a.8.8 0 0 1 .6-.8Z" />
  </Svg>
);

export const socialIcons = {
  Instagram,
  LinkedIn,
  Facebook,
};
