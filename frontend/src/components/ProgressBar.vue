<script setup lang="ts">
const props = defineProps<{
	label?: string,
	percentage: number,
	minutesRemaining?: number
}>()
</script>

<template>

<div>
	<div class="flex justify-between mb-1">
		<span>	
			<span class="text-base font-medium text-blue-700 dark:text-white">{{ percentage }}% </span>
			<span class="text-gray-400 text-sm font-normal leading-[21px]">Complete</span>
		</span>
		
		<div
			v-if="minutesRemaining != null && minutesRemaining != undefined"
			class="text-gray-400 text-sm font-normal leading-[21px]"
		>Est. {{ minutesRemaining }} minutes</div>
	</div>
	<div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
		<div class="bg-blue-600 h-2.5 rounded-full" :style="`width: ${percentage}%`"></div>
	</div>
</div>

</template>