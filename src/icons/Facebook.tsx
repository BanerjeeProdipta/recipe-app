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
    <path d="M13 10h3v3h-3v7h-3v-7H7v-3h3V8.7c0-1.1.4-2.6 1.1-3.5C12 4.4 12.8 4 14 4H16v3h-2.1c-.5 0-.9.4-.9.9V10z" />
  </svg>
);

export default SVG;
