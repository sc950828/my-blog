interface Person {
  name: string;
  age: number;
  isMale: boolean;
}

class Teacher {
  constructor(public people: Person) {}

  getProperty<T extends keyof Person>(property: T): Person[T] {
    return this.people[property];
  }
}

const teacher = new Teacher({
  name: "randy",
  age: 25,
  isMale: false,
});

const value = teacher.getProperty("age");
