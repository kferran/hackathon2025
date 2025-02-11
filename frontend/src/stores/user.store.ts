import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore('user', () => {
	const role = ref('')

	const isAuthorized = ref(false)

	return {
		isAuthorized: computed(() => isAuthorized.value)
	}
})