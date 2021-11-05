import React from 'react';
import { IconProps } from '.';

const SVG = (props: IconProps) => (
  <svg
    style={props.style}
    xmlns="http://www.w3.org/2000/svg"
    className={`w-auto ${props.className || ''}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 25 25"
    fill="none"
  >
    <path d="M16 4.144l3 3-3 3v-6zM10 16.144l-3 3 3 3v-6z" fill="currentColor" />
    <path opacity=".7" d="M17.053 7.202H5.006v8.908M21.023 10.202v8.955H9.853" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default SVG;
