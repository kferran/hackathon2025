<script setup lang="ts">
const model = defineModel()

const props = defineProps<{
	label: string | undefined,
	placeholder: string | undefined,
	type: string | undefined
}>()


</script>

<template>
<div>
	<label 
		v-if="label"
		class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
	>
		{{ label }}
	</label>
	<input
		v-model="model"
		:type="type ?? 'text'"
		:placeholder="placeholder" 
		id="first_name" 
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
		required 
	/>
</div>
</template>