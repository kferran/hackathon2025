<script setup lang="ts">
const props = defineProps<{
	image?: string
}>()
</script>

<template>


<div class=" bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-5">
    <a
		v-if="image"
		href="#"
	>
        <img 
			:src="image"
			class="rounded-t-lg w-full" 
			alt=""
		/>
    </a>
    <slot />
</div>

</template>