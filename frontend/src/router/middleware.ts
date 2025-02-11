import { useUserStore } from "@/stores/user.store";
import type { NavigationGuardNext, RouteLocationNormalizedGeneric } from "vue-router";


export async function checkAll() {
	
}

export async function checkAuthorization(to : RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric, next : NavigationGuardNext) {
	const user = useUserStore()

	if (!user.isAuthorized)
		next({ name: 'login' })

	next()
}

export async function checkLoggedIn(to : RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric, next : NavigationGuardNext) {
	const user = useUserStore()

	if (user.isAuthorized)
		next({ name: 'dashboard' })

	next()
}