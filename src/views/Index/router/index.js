import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'page@Index',
            meta: { name: 'Index' },
            component: () =>
                import('@/views/index/components/HelloWorld.vue')
        },
        {
            path: '/test',
            name: 'page@test',
            meta: { name: 'test' },
            component: () =>
                import('@/views/index/components/test.vue')
        },
        {
            path: '*',
            name: 'error@NotFoundPage',
            meta: { name: 'ErrorPage' },
            component: () =>
                import('@/views/index/components/ErrorPage.vue')
        }
    ],
    mode: `${process.env.NODE_ENV === 'production' ? 'hash' : 'history'}`
});

router.beforeEach((to, from, next) => {
    if (to.meta.name) {
        document.title = 'Yzmx-' + to.meta.name;
    } else {
        document.title = 'Yzmx';
    }
    next();
});

export default router;