const isDev = process.env.NODE_ENV === 'development'
const name = process.env.NAME === 'sc' ? '苏纯' : '晏海燕'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: `${name}的博客`,
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
      },
      {
        name: 'referrer',
        content: 'no-referrer',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: `${name}，${name}的博客，${name}的个人博客`,
      },
      {
        hid: 'description',
        name: 'description',
        content: `${name}的博客，是记录学习和成长的博客，专注于互联网技术的开发及研究，分享个人心得，记录所遇问题。`,
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `/favicon-${process.env.NAME}.ico`,
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/common.less',
    // markdown css https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css
    // '~/assets/styles/markdown.css',
    'ant-design-vue/dist/antd.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/axios',
    { src: '@/plugins/infinite-scroll', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // 自动引入组件
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
      target: isDev
        ? 'http://localhost:5000' // 本地
        : // 'http://47.117.129.194:5000' // 生产
          'http://172.19.196.91:5000', // 生产
      // 'http://47.117.129.194:5000', // 生产
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/api': '', // 把 /api 替换成 /
      },
    },
  },

  // 自定义loading
  loading: '~/components/Nav-Loading.vue',

  server: {
    host: '0.0.0.0',
    port: 4000,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
