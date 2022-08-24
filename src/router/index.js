import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'
import firebase from "firebase/compat/app";
import "firebase/auth";

const routes = [
  {
    path: '/',
    redirect: '/tabs/LoginPage'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/LoginPage'
      },
      {
        path: 'NewSale',
        name: 'NewSale',
        component: () => import('@/views/NewSale.vue')
      },
      {
        path: 'AllSales',
        name: 'AllSales',
        component: () => import('@/views/AllSales.vue')
      },
      {
        path: 'Alldrinks',
        name: 'AllDrinks',
        component: () => import('@/views/AllDrinks.vue')
      },
      {
        path: 'Analyticspage',
        name: 'AnalyticsPage',
        component: () => import('@/views/AnalyticsPage.vue')
      },
      {
        path: 'LoginPage',
        name: 'LoginPage',
        component: () => import('@/views/LoginPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

 router.beforeEach(async (to, from, next) => {
  let user = await firebase.auth().currentUser;
  if (!user && to.name !== 'LoginPage') {
     next({ name: 'LoginPage'});
  }else if(user && to.name === 'LoginPage'){
    next({ name: 'NewSale' })
  }
  else next();
})

export default router
