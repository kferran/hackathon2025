import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Product from '@/views/Product.vue'
import { checkAuthorization, checkLoggedIn } from './middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
		{
			path: '/',
			name: 'login',
			component: Login,
			beforeEnter: async (to, from, next) => {
				checkLoggedIn(to, from, next)
			}
		},
		{
			path: '/dashbord',
			name: 'dashboard',
			component: Dashboard,
			beforeEnter: async (to, from, next) => {
				checkAuthorization(to, from, next)
			}
		},
		{
			path: '/product',
			name: 'product',
			component: Product,
			beforeEnter: async (to, from, next) => {
				checkAuthorization(to, from, next)
			}
		}
	],
})

export default router
