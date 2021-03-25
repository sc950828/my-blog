module.exports = {
  checkIsAdmin(ctx) {
    return ctx.state.user["is_admin"];
  },
  getRandomCode(length= 4) {
    let randomCode = 0;
    randomCode = Math.ceil(Math.random() * Math.pow(10, length));
    while(randomCode < Math.pow(10, length-1)) {
      randomCode = Math.ceil(Math.random() * Math.pow(10, length));
    }

    return randomCode;
  }
};
