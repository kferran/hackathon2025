import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore('user', () => {
	const role = ref('')

	const username = ref('')

	const isAuthorized = ref(false)

	const login = async (loginUsername : string, loginPassword : string) => {
		username.value = loginUsername
		isAuthorized.value = true
		return true
	}

	const logout = async () => {
		username.value = ''
		isAuthorized.value = false
	}

	return {
		isAuthorized: computed(() => isAuthorized.value),
		login,
		logout
	}
})