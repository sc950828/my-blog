function greeter(person: string) {
  return "Hello, " + person;
}

const user = "Jane User";

enum Color {
  RED,
  YELLOW = 10,
  GREEN,
  BLACK,
  PINK,
}

console.log(Color.RED);
console.log(Color.YELLOW);
console.log(Color.GREEN);

enum Direction {
  LEFT = "left",
  RIGHT = "right",
}

console.log(Direction.LEFT);
console.log(Direction.RIGHT);

enum Fruits {
  ORIGIN,
  APPLE,
}

console.log(Fruits instanceof Object);
console.log(typeof Fruits);
console.log(Fruits[0]);
console.log(typeof Fruits[0]);
console.log(Fruits[1]);

// 泛型
function returnItem<T>(param: T): T {
  return param;
}

console.log(returnItem("a"));
console.log(returnItem(1));
