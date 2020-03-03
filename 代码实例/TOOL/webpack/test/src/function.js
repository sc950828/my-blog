import $ from 'jquery';
import { name } from './js/common';

console.log($);
console.log(name);

const add = (a, b) => {
  return a + b
}

const clearRepeat = (arr) => {
  // return new Set(arr)
  return arr
}

export {
  add,
  clearRepeat
}
