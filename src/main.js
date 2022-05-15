import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from '../router';
import store from '../store'
import http from 'axios'
import '../api/mock.js'


Vue.prototype.$http=http;
Vue.use(ElementUI);//使用vue.use全局注入插件。通常我们引入一个第三方组件形式的插件进来时，我们在main.js里面需要Vue.use(’该插件名字‘)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
