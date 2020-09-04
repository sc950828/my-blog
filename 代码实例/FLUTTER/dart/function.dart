void main() {
  // 匿名方法1
  var f1 = (val) {
    print(val);
  };

  f1(1);

  // 匿名方法2
  (() {
    print("test");
  })();
}
