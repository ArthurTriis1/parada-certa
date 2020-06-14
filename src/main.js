import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueTheMask from 'vue-the-mask'


Vue.use(VueTheMask)
Vue.config.productionTip = false

import './assets/scss/main.scss'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
