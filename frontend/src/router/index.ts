import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Storage from '@/components/Storage.vue'
import CreateUser from '@/views/CreateUser.vue'
import { checkAuthorization, checkLoggedIn, checkRoles, pipeRedirects } from './middleware'
import { useUserStore } from '@/stores/user.store'
import ManageDelegates from '@/views/ManageDelegates.vue'
import Training from '@/views/TrainingMock.vue'
import { useTraining } from '@/composables/useTraining'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
		{
			path: '/',
			name: 'login',
			alias: '/login',
			component: Login,
			beforeEnter: checkLoggedIn()
		},
		{
			path: '/logout',
			name: 'logout',
			redirect: () => {
				const user = useUserStore()

				user.logout()

				return { name: 'login' }
			}
		},
		{
			path: '/dashbord',
			name: 'dashboard',
			component: Dashboard,
			beforeEnter: async (to, from) => {

				const training = useTraining()

				const redirectHandler = pipeRedirects(
					checkAuthorization(),
					checkRoles([
						'adviser', 
						'delegate'
					])
				)

				const redirect = await redirectHandler(to, from)

				if (redirect)
					return redirect
			}
		},
		{
			path: '/adviser',
			name: 'adviser',
			redirect: { name: 'dashboard' },
			beforeEnter: pipeRedirects(
				checkAuthorization(),
				checkRoles([
					'adviser', 
					'delegate'
				])
			),
			children: [
				{
					path: 'manage-delegates',
					name: 'adviser.manage-delegates',
					component: ManageDelegates
				}
			]
		},
		{
			path: '/admin',
			name: 'admin',
			redirect: { name: 'admin.create-user' },
			children: [
				{
					path: 'create-user',
					name: 'admin.create-user',
					component: CreateUser
				},
				{
					path: 'storage',
					name: 'admin.storage',
					component: Storage
				}
			]
		},
		{
			path: '/training',
			name: 'training',
			component: Training
		}
	],
})

export default router
