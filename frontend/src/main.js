import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store/store';
import './registerServiceWorker';
import './filters.js';

//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'

library.add(faHeart)
library.add(faTimes)
library.add(faComment)
library.add(faShare)
Vue.component('font-awesome-icon', FontAwesomeIcon)

//Element-ui

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { locale })
// Vue.use(ElementUI, { size: 'small', zIndex: 0 });

import '@/sass/style.scss';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
