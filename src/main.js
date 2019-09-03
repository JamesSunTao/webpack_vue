import Vue from 'vue';
import App from './App.vue';
import store from './store/store';

import './assets/css/reset.css'

new Vue({
    store,
    render: h => h(App),
  }).$mount('#app');