const Setting = require("../models/setting");

const getSetting = async (key) => {
  const { value="" } = await Setting.findOne({ key });

  return value;
};

module.exports = {
  getSetting,
};
