const { Schema, model } = require("mongoose");

// 设置
const setingSchema = new Schema(
  {
    // 键
    key: { type: String, required: true, trim: true },
    // 值
    value: { type: String, required: true,trim: true },
  },
  { timestamps: true }
);

module.exports = model("Setting", setingSchema);
