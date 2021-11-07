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
 <path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5a2 2 0 00-2 2v14c0 1.1.9 2 2 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-9 14l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"/>
  </svg>
);

export default SVG;
