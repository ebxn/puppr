import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueSession from 'vue-session'
import App from './App.vue'
import router from './router'
import store from './store/store'

// configure vue
Vue.use(Vuelidate)
Vue.use(VueSession, { persist: true })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
