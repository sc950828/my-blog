interface Bird {
  fly: boolean;
  sing(): void;
}

interface Dog {
  fly: boolean;
  bark(): void;
}

function animal(animal: Bird | Dog) {
  if (animal.fly) {
    (animal as Bird).sing();
  } else {
    (<Dog>animal).bark();
  }
}

const obj: Bird | Dog = {
  fly: true,
  sing: () => {
    console.log(123);
  },
};

animal(obj);
