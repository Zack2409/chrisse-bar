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
        path: 'Alldrinks',
        name: 'AllDrinks',
        component: () => import('@/views/AllDrinks.vue')
      },
      {
        path: 'Analyticspage',
        name: 'AnalyticsPage',
        component: () => import('@/views/AnalyticsPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
