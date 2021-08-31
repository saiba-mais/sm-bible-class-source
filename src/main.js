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
  primarycolor: '#71456D',
  secondarcolor: '#996e95',
  lightalphcontainerbg: 'rgba(255,255,255,.8)',
  lightestcontainerbg: '#fff',
  lightcontainerbg: '#e4eaec',
  containerbg: '#eef1f2',
  darkalphacontainerbg: 'rgba(0,0,0,.03)',
  calloutbg: '#fcfae7',
  bordercolor: '#dadada',
  lightesttextcolor: '#fff',
  lighttextcolor: '#cacaca',
  textcolor: '#acadad',
  darktextcolor: '#575e5f',
  darkesttextcolor: '#000',
  successbg: '#dcefc4',
  success: '#66a91a',
  errorbg: '#efc4c4',
  error: '#e22d2d',
  // language settings
  lang: 'en',
  // contact settings
  messenger: null,
  whatsapp: null,
  // apis
  progressendpoint: 'https://saibamais.org.br/wp-json/saibamais/v2/progress'
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
