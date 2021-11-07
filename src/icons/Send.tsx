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
    <path d="M8.8 17.6v4.6a.8.8 0 001.3.5l2.7-3.7zM23.7.1a.8.8 0 00-.8 0L.4 11.8a.8.8 0 00.1 1.4l6.3 2.1L20 4 9.8 16.4 20.3 20a.8.8 0 00.6-.1c.2-.1.3-.3.3-.5L24 .9c0-.3 0-.6-.3-.8z" />
  </svg>
);

export default SVG;
