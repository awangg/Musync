import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from 'vue-cookies'
import VModal from 'vue-js-modal'

import App from './App.vue';
import router from './utils/router';

Vue.use(ElementUI);
Vue.use(VueCookies);
Vue.use(router);
Vue.use(VModal)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
