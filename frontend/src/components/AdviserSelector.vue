<script setup lang="ts">
import BaseSelect from '@/components/BaseSelect.vue';
import { useUserStore } from '@/stores/user.store';
import { computed, onMounted, ref, watch } from 'vue';

const user = useUserStore()

const adviserOptions = computed(() => user.relatedAdvisers.map(adviser => ({
	display: `${adviser.firstName} ${adviser.lastName}`,
	value: adviser.guid
})))

const selectedAdviserGuid = ref(user.selectedAdviser?.guid)

watch(selectedAdviserGuid, async () => {
	await user.setSelectedAdviserByGuid(selectedAdviserGuid.value ?? '')
})

watch(() => user.selectedAdviserGuid, () => {
	console.log('guid changed')
})

</script>

<template>
	<BaseSelect
		v-model="selectedAdviserGuid"
		:options="adviserOptions"
	/>
</template>