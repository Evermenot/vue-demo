import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: resolve => require(['../components/page/richTxtJS.vue'], resolve)
        },
        {
            path: '/canvas',
            component: resolve => require(['../components/page/canvas.vue'], resolve)
        }
    ]
})
