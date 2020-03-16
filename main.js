import Vue from 'vue'
import App from './App'
import md5 from './js_sdk/md5.js'
import store from './store'
import $ajax from "./common/ajax.js"
import service from './service.js'
import VueClipboard from 'vue-clipboard2'
import validCode from './components/validCode.vue'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$ajax = $ajax
Vue.prototype.$service = service
Vue.prototype.$md5  = md5
Vue.use(VueClipboard)
Vue.component('validcode',validCode)
App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
