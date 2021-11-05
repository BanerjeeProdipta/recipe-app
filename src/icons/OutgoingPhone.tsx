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
    <path d="M23 7V1h-6M16 8l7-7M22 17v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7 2 2 0 0 1 2-2.2h3a2 2 0 0 1 2 1.7 12.8 12.8 0 0 0 .6 2.8 2 2 0 0 1-.4 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2-.4 12.8 12.8 0 0 0 2.9.7 2 2 0 0 1 1.7 2z" />
  </svg>
);

export default SVG;
