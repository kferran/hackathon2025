import { ref, shallowRef, type Component } from "vue";

const component = shallowRef<OverlayComponent>(null)
const props = ref<any>(null)

export type OverlayComponent = Component | null

export function useOverlay() {
	const openOverlay = (newComponent : OverlayComponent, newProps : any = {}) => {
		component.value = newComponent
		props.value = newProps
		window.scrollTo(0, 0)
	}

	const closeOverlay = () => {
		component.value = null
		props.value = null

	}

	return {
		openOverlay,
		closeOverlay,
		component,
		props
	}
}