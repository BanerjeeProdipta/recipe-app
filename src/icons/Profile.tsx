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
      d="M7.2 14.8l3-4 3.5 2.8 2.9-3.8"
      stroke="#fff"
      strokeWidth="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle cx="20" cy="4.2" r="1.9" stroke="#fff" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M13 8a4 4 0 10-8 0 4 4 0 008 0zm-2 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM1 18v2h16v-2c0-2.7-5.3-4-8-4s-8 1.3-8 4zm2 0c.2-.7 3.3-2 6-2s5.8 1.3 6 2H3zm17-3v-3h3v-2h-3V7h-2v3h-3v2h3v3h2z" />
  </svg>
);

export default SVG;
