const add = (a, b) => {
  return a + b;
}

const set = new Set()
set.add(1)
set.add(1)
set.add(2)
console.log(set)

const obj1 = Object.assign({}, {name: 'randy', age: 24});
console.log(obj1);

'foo'.includes('f');

let promise = new Promise(function (resolve,reject) {
  setTimeout(()=>{resolve()},1000)
})
Array.from(new Set([1, 2, 3, 2, 1])); 
[1, 2, NaN, 3, 4].findIndex(isNaN);  
