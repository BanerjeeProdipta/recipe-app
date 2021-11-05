import React from 'react';
import { IconProps } from '.';

const SVG = (props: IconProps) => (
  <svg
    width={props.width ? props.width : '100%'}
    style={props.style}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon w-auto ${props.className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 21 21"
    fill="none"
  >
    {' '}
    <rect
      x="1.839"
      y="1.682"
      width="18"
      height="18"
      rx="3"
      stroke="#FFCE73"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="6.839" y="6.682" width="8" height="8" rx="2" fill="#FFCE73" />
  </svg>
);

export default SVG;
