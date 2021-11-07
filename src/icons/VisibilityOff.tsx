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
    <path d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z" fill="none" />
    <path d="M12 7a5 5 0 015 5 4.853 4.853 0 01-.36 1.83l2.92 2.92A11.817 11.817 0 0022.99 12a11.827 11.827 0 00-11-7.5 11.645 11.645 0 00-3.98.7l2.16 2.16A4.853 4.853 0 0112 7zM2 4.27l2.28 2.28.46.46A11.8 11.8 0 001 12a11.822 11.822 0 0015.38 6.66l.42.42L19.73 22 21 20.73 3.27 3zM7.53 9.8l1.55 1.55A2.821 2.821 0 009 12a3 3 0 003 3 2.821 2.821 0 00.65-.08l1.55 1.55A4.967 4.967 0 017.53 9.8zm4.31-.78l3.15 3.15.02-.16a3 3 0 00-3-3z" />
  </svg>
);

export default SVG;
