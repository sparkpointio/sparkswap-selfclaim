import _ from 'lodash'

export function randomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function BoolFromString(value: 'true' | 'false' | string) {
  return (String(value).toLowerCase() === 'true');
}

const lodash = _;

export default lodash
