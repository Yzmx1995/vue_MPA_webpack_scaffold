import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/pageOne.html/',
            name: 'page@test',
            meta: { name: 'test' },
            component: () =>
                import('@/views/pageOne/components/test.vue')
        },
        {
            path: '/pageOne.html/test',
            name: 'page@test111',
            meta: { name: 'test111' },
            component: () =>
                import('@/views/pageOne/components/test111.vue')
        },
        {
            path: '*',
            name: 'error@NotFoundPage',
            meta: { name: 'ErrorPage' },
            component: () =>
                import('@/views/pageOne/components/ErrorPage.vue')
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