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
    <path d="M52.8 15c-1.8.9-3.7 1.4-5.8 1.7 2.1-1.3 3.7-3.3 4.5-5.6-2 1.1-4.1 2-6.4 2.4a10 10 0 00-17.3 9.2A28.7 28.7 0 017 12.2a10 10 0 003.1 13.5 10 10 0 01-4.5-1.3v.1c0 5 3.4 9 8 10a10.2 10.2 0 01-4.5.1c1.3 4 5 7 9.4 7a20.3 20.3 0 01-15 4.2 28.6 28.6 0 0044.2-25.5c2-1.4 3.8-3.2 5.1-5.2z" />
  </svg>
);

export default SVG;
