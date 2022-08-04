import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/NewSale'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/NewSale'
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
        path: '/tabs/alldrinks',
        name: 'AllDrinks',
        component: () => import('@/views/AllDrinks.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
