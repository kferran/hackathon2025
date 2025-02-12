<script setup lang="ts">
import BaseSelect from '@/components/BaseSelect.vue';
import AdviserSelectOverlay from '@/components/AdviserSelectOverlay.vue';
import { useUserStore } from '@/stores/user.store';
import { computed, onMounted, ref, watch } from 'vue';
import { useOverlay } from '@/composables/useOverlay';

const user = useUserStore()
const overlay = useOverlay()

const adviserOptions = computed(() => {
	const options = user.relatedAdvisers.map(adviser => ({
		display: `${adviser.firstName} ${adviser.lastName}`,
		value: adviser.guid
	}))

	return [
		{
			display: 'Select a Producer',
			value: ''
		},
		...options
	]
})

const selectedAdviserGuid = ref(user.selectedAdviser?.guid ?? '')

watch(selectedAdviserGuid, async () => {
	await user.setSelectedAdviserByGuid(selectedAdviserGuid.value ?? '')
})

watch(() => user.selectedAdviserGuid, () => {
	selectedAdviserGuid.value = user.selectedAdviserGuid ?? ''

	if (!user.selectedAdviserGuid)
		overlay.openOverlay(AdviserSelectOverlay)
	
})

</script>

<template>
	<BaseSelect
		v-model="selectedAdviserGuid"
		:options="adviserOptions"
	/>
</template>