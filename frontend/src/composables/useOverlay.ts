import { ref, shallowRef, type Component } from "vue";
import AdviserSelectOverlay from "@/components/AdviserSelectOverlay.vue";
import adviserOverlayBackground from '@/assets/adviser-select-background.jpg'

const component = shallowRef<OverlayComponent>(null)
const props = ref<any>(null)

export type OverlayComponent = Component | null

export function useOverlay() {
	const openOverlay = (newComponent : OverlayComponent, newProps : any = {}, image: string = '') => {
		component.value = newComponent
		props.value = newProps
		window.scrollTo(0, 0)

		if (image)
			document.body.style.background = `url(${image})`
	}

	const closeOverlay = () => {
		component.value = null
		props.value = null
		document.body.style.background = ''
	}

	const openAdviserSelectOverlay = () => {
		openOverlay(AdviserSelectOverlay, {}, adviserOverlayBackground)
	}

	return {
		openOverlay,
		closeOverlay,
		openAdviserSelectOverlay,
		component,
		props
	}
}