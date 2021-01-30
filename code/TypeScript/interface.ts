interface Person {
  name: string;
  age: number;
}

function say1(p: Person): void {
  console.log(p.name);
}

const p = { name: "randy", age: 25 };
say1(p);
