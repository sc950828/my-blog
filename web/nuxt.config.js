export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.NAME === 'sc' ? '苏纯的博客' : '晏海燕的博客',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          process.env.NAME === 'sc' ? '/favicon-sc.ico' : '/favicon-yhy.ico',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/common.less', 'ant-design-vue/dist/antd.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/axios',
    { src: '@/plugins/infinite-scroll', ssr: false },
    { src: '@/plugins/mavon-editor', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true, // 表示开启代理
    prefix: '/api', // 表示给请求url加个前缀 /api
    credentials: true, // 表示跨域请求时是否需要使用凭证
  },
  env: {
    NODE_ENV: process.env.NODE_ENV,
    NAME: process.env.NAME,
  },
  proxy: {
    '/api': {
      target:
        process.env.NODE_ENV === 'development' // 本地
          ? 'http://localhost:5000'
          : 'http://172.19.196.91:5000', // 生产
      // 'http://47.117.129.194:5000', // 生产
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/api': '', // 把 /api 替换成 /
      },
    },
  },

  server: {
    host: '0.0.0.0',
    port: 4000,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
