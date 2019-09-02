import Vue from 'vue';
import App from './App.vue';
import "babel-polyfill";
import './assets/css/reset.less';
import router from './router';
import Axios from './assets/plugin/axios';
import handleError from './assets/plugin/handleError';

Vue.config.productionTip = false;   // hidden some warn

Vue.use(Axios);
Vue.use(handleError);

new Vue({
    el: "#app",
    template: '<App/>',
    router,
    components: { App }
});