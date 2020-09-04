void main() {
  var list = List();
  list.add('a');
  list.add('b');
  list.add('c');
  list.add('d');
  for (var i in list) {
    print(i);
  }

  Person p = Person.withMap('randy');
  print(p.name);
}

class Person {
  String name;
  Person.withMap(this.name);
}
