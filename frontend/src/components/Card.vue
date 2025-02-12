<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
	image?: string
	wideImage?: boolean
}>()

const aspect = computed(() => props.wideImage ? 'aspect-384/192' : 'aspect-1/1')
</script>

<template>


<div class=" bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-5">
    <a
		v-if="image"
		href="#"
	>
        <img 
			:src="image"
			:class="`rounded-t-lg w-full ${aspect}`" 
			alt=""
		/>
    </a>
    <slot />
</div>

</template>