// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import draggable from 'vuedraggable'
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
import { pt } from './lang/pt.json'
import { en } from './lang/en.json'

import 'bootstrap/scss/bootstrap.scss'
import './assets/sass/core.scss'

Vue.use(draggable)
Vue.use(VueResource)
Vue.use(VueI18n)
Vue.config.productionTip = false

function getURLSettings () {
  let list = window.location.search.match(/([^&]+)+/g)
  let map = list.reduce((map, item) => {
    if (item.charAt(0) === '?') {
      item = item.substring(1)
    }
    let keyValue = item.split('=')
    map[ decodeURIComponent(keyValue[0]) ] = decodeURIComponent(keyValue[1])
    return map
  }, {})
  return map
}

let defaultSettings = {
  // color settings
  primaryColor: '#71456D',
  secondaryColor: '#996e95',
  lightAlphaContainerBg: 'rgba(255,255,255,.8)',
  lightestContainerBg: '#fff',
  lightContainerBg: '#e4eaec',
  containerBg: '#eef1f2',
  darkAlphaContainerBg: 'rgba(0,0,0,.03)',
  calloutBg: '#fcfae7',
  borderColor: '#dadada',
  lightestTextColor: '#fff',
  lightTextColor: '#cacaca',
  textColor: '#acadad',
  darkTextColor: '#575e5f',
  darkestTextColor: '#000',
  successBg: '#dcefc4',
  success: '#66a91a',
  errorBg: '#efc4c4',
  error: '#e22d2d',
  // language settings
  lang: 'en',
  // contact settings
  messenger: null,
  whatsapp: null
}

let userSettings = getURLSettings()
let settings = Object.assign(defaultSettings, userSettings)
// let localeLang = bibleClassInit.languageConfig

const i18n = new VueI18n({
  locale: settings.lang, // set locale
  messages: {
    'pt': pt,
    'en': en
  }// set locale messages
})

Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n: i18n,
  template: '<App/>',
  components: {App},
  data: settings
})
