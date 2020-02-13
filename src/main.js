import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {Toast} from 'vant';
import store from './store';
import 'vant/lib/index.css';
import toast from 'components/common/toast'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();
Vue.use(Toast);

Vue.use(toast);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
　//require('./assets/css/base.css');