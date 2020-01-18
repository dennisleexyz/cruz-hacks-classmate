import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/courses'
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/courses', 
    component: () => import('@/views/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'courses',
        redirect: '/courses/fall'
      },
      {
        path: 'fall',
        name: 'fall',
        component: () => import('@/views/CourseTableMeta')
      },
      {
        path: 'winter',
        name: 'winter',
        component: () => import('@/views/CourseTableMeta')
      },
      {
        path: 'spring',
        name: 'spring',
        component: () => import('@/views/CourseTableMeta')
      },
      {
        path: 'summer',
        name: 'summer',
        component: () => import('@/views/CourseTableMeta')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
