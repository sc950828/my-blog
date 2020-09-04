void main() {
  int a = 10;
  int b = 3;
  print(a + b);
  print(a - b);
  print(a * b);
  print(a / b);
  print(a ~/ b);
  print(a % b);

  double c = 12.7;
  int d = -5;

  print(d.abs());
  print(c.floor());
  print(c.ceil());
  print(c.round());

  print(d.isEven);
  print(d.isOdd);

  int e;
  e ??= 10;
  print(e);

  int f = 10;
  int g = 3;
  print(f ~/= g);
  print(f += g);
  print(f %= g);
}
