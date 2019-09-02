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
                import('@/views/HelloWorld.vue')
        },
        {
            path: '*',
            name: 'error@NotFoundPage',
            component: () =>
                import('@/views/Error.vue')
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