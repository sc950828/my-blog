import other from "./other";
import { sayHello } from "Hello";
import { sayHello as sayHello2 } from "@/Hello.js";

// 热更新需要配置
if (module && module.hot) {
  module.hot.accept();
}

console.log("index.js");

sayHello();
sayHello2();

// new webpack.ProvidePlugin({
//   jquery: "jquery"
// })
console.log(jquery);
