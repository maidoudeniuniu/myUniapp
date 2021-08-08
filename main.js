import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'


// #ifdef H5 | H5-AQC
   console.log("爱情诚")
// #endif


// #ifdef H5 | H5-ZT
  console.log("政通")
// #endif


const app = new Vue({
    ...App
})
app.$mount()
