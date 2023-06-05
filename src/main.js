import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toastReg from './components/toast/toast'
Vue.use(toastReg)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')
