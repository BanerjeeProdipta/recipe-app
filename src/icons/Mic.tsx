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
    <path d="M12 14a2.987 2.987 0 002.99-3L15 5a3 3 0 00-6 0v6a3 3 0 003 3zm-1.2-9.1a1.2 1.2 0 112.4 0l-.01 6.2a1.2 1.2 0 11-2.39 0V4.9zm6.5 6.1a5.189 5.189 0 01-5.3 5.1A5.189 5.189 0 016.7 11H5a6.984 6.984 0 006 6.72V21h2v-3.28A6.968 6.968 0 0019 11z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export default SVG;
