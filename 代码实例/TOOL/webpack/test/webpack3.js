const path = require("path");

module.exports = {
  entry: {
    main: "./src/webpack3/index.js"
  },
  output: {
    filename: "bound.js",
    path: path.resolve(__dirname, "dist3")
  },
  mode: "development",
  // mode: "production", // 默认会开启 tree-shaking
  optimization: {
    usedExports: true
  }
};
