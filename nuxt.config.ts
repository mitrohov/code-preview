export default {
  devtools: { enabled: true },
  modules: [
    'nuxt-primevue',
    '@pinia/nuxt',
  ],
  primevue: {
    unstyled: true,
  },
  css: [
    'primevue/resources/themes/lara-light-green/theme.css',
    'primeicons/primeicons.css',
    '~/assets/style/main.scss'
  ],
}
