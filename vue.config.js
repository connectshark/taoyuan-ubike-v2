module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue3-template/'
    : '/',

  pluginOptions: {
    i18n: {
      locale: 'tw',
      fallbackLocale: 'tw',
      localeDir: 'i18n',
      enableLegacy: undefined,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  },

  productionSourceMap: false
}
