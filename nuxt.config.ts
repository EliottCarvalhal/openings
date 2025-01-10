import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  runtimeConfig: {
    // Private config that is only available on the server
    mongoUri: process.env.MONGODB_URI,
    // Public config that is also exposed to the client
    public: {
      // public config
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/tailwindcss',
    'nuxt-mongoose',
  ],
  //@ts-ignore
  electron: {
    build: [{ entry: 'electron/main.js' }],
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  nitro: {
    plugins: ['~/server/plugins/mongoose.ts'],
  },

  routeRules: {
    '/': {
      redirect: '/home',
    },
  },

  compatibilityDate: '2024-07-25',
})
