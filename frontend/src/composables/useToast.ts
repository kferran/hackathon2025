import { randomGuid } from "@/core/utils"
import { ref } from "vue"

export interface IToast {
	type: 'success' | 'warning' | 'error'
	guid?: string
	message: string
	timeout: number | null | undefined
}

const toasts = ref<IToast[]>([])

export function useToast() {
	const push = (toast : IToast) => {
		toast.guid = randomGuid()

		toasts.value.push(toast)

		if (toast.timeout) {
			setTimeout(() => {
				removeToast(toast)
			}, toast.timeout)
		}
	}

	const getToasts = () => toasts.value

	const removeToast = (toast : IToast) => toasts.value = toasts.value.filter(x => x.guid !== toast.guid)

	return {
		push,
		getToasts,
		removeToast
	}
}