import { useUserStore } from "@/stores/user.store";
import type { RouteLocationNormalizedGeneric } from "vue-router";

export async function checkAll() {
	
}

export async function checkAuthorization(to : RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric) {
	const user = useUserStore()

	if (!user.isAuthorized)
		return null

	return null
}