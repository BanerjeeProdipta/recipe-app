import React from 'react';
import { IconProps } from '.';

const SVG = (props: IconProps) => (
  <svg
    width={props.width ? props.width : '100%'}
    style={props.style}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon w-auto ${props.className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
  >
    <path
      d="M8 .354a8 8 0 100 16 8 8 0 000-16zM9.378 8.5c-.077.931-.359 1.825-.499 2.746-.02.176-.061.456.026.546.239.246.488.616.366 1.06a1.045 1.045 0 01-.963.736c-.697 0-1.218-.658-1.354-1.239-.097-.412-.091-.827-.036-1.243.111-.836.342-1.649.47-2.48a1.023 1.023 0 01-.816-.72c-.147-.535.178-1.055.691-1.217.546-.173 1.288-.15 1.693.33.498.592.443 1.233.422 1.481zM8.095 5.857a1.368 1.368 0 110-2.735 1.368 1.368 0 010 2.735z"
      fill="#808191"
    />
  </svg>
);

export default SVG;
