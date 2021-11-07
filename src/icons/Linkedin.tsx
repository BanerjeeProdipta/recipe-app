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
    <path d="M8 19H5V9h3v10zm11 0h-3v-5.3c0-1.4-.5-2.1-1.5-2.1-.8 0-1.3.4-1.5 1.1V19h-3V9h2.4l.2 2c.6-1 1.6-1.7 3-1.7 1 0 1.8.3 2.4 1 .7.7 1 1.7 1 3V19z" />
    <ellipse cx="6.5" cy="6.5" rx="1.6" ry="1.5" />
  </svg>
);

export default SVG;
