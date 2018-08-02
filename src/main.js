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

// let localeLang = window.location.search.match(/^.*lang=([^&]+).*$/g)[1]
let localeLang = /^.*lang=([^&]+).*$/g.exec(window.location.href)[1]

const i18n = new VueI18n({
  locale: localeLang, // set locale
  messages: {
    'pt': pt,
    'en': en
  }// set locale messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n: i18n,
  template: '<App/>',
  components: {App}
})
