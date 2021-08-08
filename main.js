import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import uView from 'uview-ui'
Vue.use(uView)



//工具类
import CCU from './common/utils.js'
Vue.prototype.$CCU = CCU


//针对h5 
import { PlatForm, jsApiPlugin } from "./lib/index.esm";

if(window){
	Vue.use(jsApiPlugin, {platform:PlatForm.AQC});
 }


const app = new Vue({
    ...App
})
app.$mount()
