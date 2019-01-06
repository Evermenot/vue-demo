import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: resolve => require(['../components/page/richTxtJS.vue'], resolve),
            // children:[
            //     {
            //         path: '/',
            //         redirect: '/test'
            //     },
            //     {
            //         path: '/test',
            //         component: resolve => require(['../components/page/Hello.vue'], resolve)
            //     }
            // ]
        },
        {
            path: '/hello',
            component: resolve => require(['../components/page/Hello.vue'], resolve),
        }
    ]
})
