import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import roboto from 'roboto-fontface/css/roboto/roboto-fontface.css';
import mdi from '@mdi/font/css/materialdesignicons.css';
import axios from 'axios';
import animatecss from 'animate.css';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

new Vue({
    vuetify,
    roboto,
    mdi,
    animatecss,
    render: h => h(App)
}).$mount('#app');
