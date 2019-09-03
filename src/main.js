import Vue from 'vue';
import App from './App.vue';
import store from './store/store';

import './assets/css/reset.css'
// import _ from 'lodash-es'
// console.log(_([1, 2, 3], 2))

new Vue({
    store,
    render: h => h(App),
  }).$mount('#app');