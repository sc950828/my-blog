import "@babel/polyfill";

const fn = () => {
  console.log("a");
};

const isHas = [1, 2, 3].includes(2);

const p = new Promise((resolve, reject) => {
  resolve(100);
});
