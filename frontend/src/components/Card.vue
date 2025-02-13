<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
	image?: string
	wideImage?: boolean
}>()

const wide = computed(() => props.wideImage ? 'height: 192px; overflow: hidden; object-fit: cover' : '')
</script>

<template>


<div class=" bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-5">
    <a
		v-if="image"
		href="#"
	>
        <img 
			:src="image"
			:class="`rounded-t-lg w-full aspect-1/1`"
			:style="wide"
			alt=""
		/>
    </a>
    <slot />
</div>

</template>