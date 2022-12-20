// import HomeViewVue from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import NewTaskFormAndTasksList from '../components/NewTaskFormAndTasksList.vue'
// import { auth } from '../firebase'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
  {
    path: '/',
    name: 'dashboard',
    component: NewTaskFormAndTasksList,
    meta: {
      requiresAuth: true
    }
  },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/bjir/:alias',
      name: 'x',
      component: () => import('../views/Redirect.vue')
    }
],
});

router.beforeEach((to, from, next) => {
  const checkToken = localStorage.getItem('userToken');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (checkToken) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router