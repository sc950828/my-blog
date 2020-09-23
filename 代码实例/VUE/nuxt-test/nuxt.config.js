export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "~/assets/css/common.css",
    "~/assets/css/b.scss",
    "~/assets/css/c.less"
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  bootstrapVue: {
    icons: true // 配置icons
  },

  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'about2',
        path: '/about2',
        component: resolve(__dirname, 'pages/about1/child.vue')
      })
    }
  },
  // server: {
  //   port: 8000, // default: 3000
  //   host: '0.0.0.0' // default: localhost,
  // }
}
