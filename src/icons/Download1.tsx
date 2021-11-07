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
 <path d="M0 447.8h482.2v34.4H0zM396 223.9l-24.2-24.4L258.3 313V0H224v313L110.4 199.5l-24.2 24.3 155 155.1z"/>
  </svg>
);

export default SVG;
