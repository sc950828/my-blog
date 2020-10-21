"use strict";
function greeter(person) {
    return "Hello, " + person;
}
var user = "Jane User";
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["YELLOW"] = 10] = "YELLOW";
    Color[Color["GREEN"] = 11] = "GREEN";
    Color[Color["BLACK"] = 12] = "BLACK";
    Color[Color["PINK"] = 13] = "PINK";
})(Color || (Color = {}));
console.log(Color.RED);
console.log(Color.YELLOW);
console.log(Color.GREEN);
var Direction;
(function (Direction) {
    Direction["LEFT"] = "left";
    Direction["RIGHT"] = "right";
})(Direction || (Direction = {}));
console.log(Direction.LEFT);
console.log(Direction.RIGHT);
var Fruits;
(function (Fruits) {
    Fruits[Fruits["ORIGIN"] = 0] = "ORIGIN";
    Fruits[Fruits["APPLE"] = 1] = "APPLE";
})(Fruits || (Fruits = {}));
console.log(Fruits instanceof Object);
console.log(typeof Fruits);
console.log(Fruits[0]);
console.log(typeof Fruits[0]);
console.log(Fruits[1]);
// 泛型
function returnItem(param) {
    return param;
}
console.log(returnItem("a"));
console.log(returnItem(1));
