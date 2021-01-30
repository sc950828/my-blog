class Person1 {
  constructor(public name: string) {}
}

class Teacher extends Person1 {
  constructor(public age: number) {
    super("randy");
  }
}

const t = new Teacher(12);
console.log(t.name, t.age);
