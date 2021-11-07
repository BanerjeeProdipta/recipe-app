import React from 'react';
import { IconProps } from '.';

const SVG = (props: IconProps) => (
  <svg
    style={props.style}
    xmlns="http://www.w3.org/2000/svg"
    className={`w-auto ${props.className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 56 56"
    fill="none"
  >
    <path
      d="M35 32.667l11.667-11.666L35 9.334"
      stroke="#2586C3"
      strokeWidth="4.667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.333 46.667V30.333A9.333 9.333 0 0118.667 21h28"
      stroke="#2586C3"
      strokeWidth="4.667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SVG;
