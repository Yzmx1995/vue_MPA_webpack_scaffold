import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const router = new Router({
    mode: `${process.env.NODE_ENV === 'production' ? 'hash' : 'history'}`,
    routes: [
        {
            path: '/pageOne.html/',
            redirect: '/pageOne'
        },
        {
            path: '/pageOne',
            name: 'page@Hello',
            meta: { name: 'hello' },
            component: () =>
                import('@/views/pageOne/components/HelloWorld.vue')
        },,
        {
            path: '/pageOne/other',
            name: 'page@otherinpageone',
            meta: { name: 'other' },
            component: () =>
                import('@/views/pageOne/components/otherRouter.vue')
        },
        {
            path: '*',
            name: 'error@NotFoundPage',
            meta: { name: 'ErrorPage' },
            component: () =>
                import('@/views/pageOne/components/ErrorPage.vue')
        }
    ],
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