import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import axios from 'axios';
import App from './App';
import "babel-polyfill";

Vue.use(ElementUI);
Vue.prototype.$axios = axios;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');