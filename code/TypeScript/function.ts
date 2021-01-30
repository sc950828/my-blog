// 箭头函数1
const getTotal: (num: number) => number = (num) => {
  return num;
};

// 箭头函数2
const getTotal2 = (num: number): number => {
  return num;
};

// 普通函数
function getNum(num1: number, num2: number): number {
  return num1 + num2;
}

// 没有返回值的函数
function sayName(): void {
  console.log("randy");
}

// 结构参数的函数
function sayFullName({ name, age }: { name: string; age: number }): string {
  return name + age;
}
sayFullName({ name: "randy", age: 26 });
