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
    <path d="M12 6a2 2 0 11-2 2 2 2 0 012-2m0 9l6 2v1H6v-1l6-2m0-11a4 4 0 104 4 4 4 0 00-4-4zm0 9c-3 0-8 1-8 4v3h16v-3c0-3-5-4-8-4z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
);

export default SVG;
