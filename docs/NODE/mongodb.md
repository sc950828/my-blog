### 安装 mongoose

```js
npm i mongoose
const mongoose = require("mongoose");
```

### 连接

```js
const uri = "mongodb://localhost/myapp";
mongoose
  .connect(uri, options)
  .then((res) => {})
  .catch((e) => {}); //函数接受回调函数，或返回一个 promise。

// 调用 mongoose.connect() 时，Mongoose 会自动创建默认连接。 你可以使用 mongoose.connection 访问默认连接。
```

### model

```js
var schema = new mongoose.Schema({ name: "string", size: "string" });
var Tank = mongoose.model("Tank", schema);
```

### document
