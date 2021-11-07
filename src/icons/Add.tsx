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
    <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
);

export default SVG;
