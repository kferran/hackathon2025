import type { UserRole } from "@/core/model";
import { useUserStore } from "@/stores/user.store";
import type { RouteLocationNormalizedGeneric } from "vue-router";

export type Middleware = (to : RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric) => Promise<any>

export const pipeRedirects = (...middleware : Middleware[]) : Middleware => async (to, from) => {
	for (const check of middleware) {
		const redirect = await check(to, from)

		if (redirect)
			return redirect
	}

	return null
}

export const checkAuthorization = (redirect : string = 'login') : Middleware => async (to, from) => {
	const user = useUserStore()

	await user.fetchCurrentUser()

	if (!user.isAuthorized)
		return { name: redirect }

	return null
}

export const  checkRoles = (roles : UserRole[], redirect : string = 'dashboard') : Middleware => async (to, from) => {
	const user = useUserStore()

	if (!user.role || !roles.includes(user.role))
		return { name: redirect }

	return null
}

export const checkLoggedIn = (redirect : string = 'dashboard') : Middleware => async (to, from) => {
	const user = useUserStore()

	await user.fetchCurrentUser()

	if (user.isAuthorized)
		return { name: redirect }

	return null
}