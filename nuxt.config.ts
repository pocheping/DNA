/*
 * @Author: lym
 * @Date: 2025-01-05 22:46:17
 * @LastEditors: lym
 * @LastEditTime: 2025-01-20 21:24:37
 * @Description: 
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n'
  ],

  build: {
    transpile: [
      'element-plus/es',
      '@element-plus/icons-vue'
    ]
  },

  vite: {
    optimizeDeps: {
      include: ['element-plus/es']
    },
    ssr: {
      noExternal: ['element-plus', '@element-plus/icons-vue']
    },
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/element/index.scss" as *;`
        }
      }
    }
  },

  css: [
    'element-plus/dist/index.css',
    '@/assets/styles/fonts.css'
  ],

  // 其他配置保持不变
  components: {
    dirs: [
      {
        path: '~/components',
        extensions: ['.vue'],
      }
    ]
  },

  i18n: {
    langDir: 'i18n/locales',
    defaultLocale: 'en',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'zh', iso: 'zh-CN', file: 'zh.json' }
    ],
    strategy: 'no_prefix',
    detectBrowserLanguage: false
  }
})
