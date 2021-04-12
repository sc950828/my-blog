module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // "off" or 0 - 关闭规则
  // "warn" or 1 - 将规则视为一个警告（不会影响退出码）
  // "error" or 2 - 将规则视为一个错误 (退出码为1)
  rules: {
    'no-console': 'off',
  },
}
