import { onBeforeUnmount, onMounted } from "vue"

export function useEndpointPoller() {

	const startPoller = (interval : number, callEndpoint : () => Promise<any>) => {
		let intervalInstance : number | null = null

		onMounted(() => {
			console.log('poll started')
			intervalInstance = setInterval(callEndpoint, interval)

			callEndpoint()
		})

		onBeforeUnmount(() => {
			console.log('poll ended')
			if (intervalInstance)
				clearInterval(intervalInstance)
		})
	}
	
	return {
		startPoller
	}
}