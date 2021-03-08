module.exports = {
  checkIsAdmin(ctx) {
    return ctx.state.user["is_admin"];
  },
};
