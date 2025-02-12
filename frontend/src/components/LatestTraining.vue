<script setup lang="ts">
import LatestTrainingCard from '@/components/LatestTrainingCard.vue';
import { computed } from 'vue';
import { useUserStore } from '@/stores/user.store';
import { chunk } from '@/core/utils';

const user = useUserStore()

const chunkedTrainings = computed(() => user.incompleteNonRequiredTrainings.slice(0, 3))
</script>

<template>
<div
	v-if="user.incompleteNonRequiredTrainings.length"
	class="w-full p-20 bg-[#111928] flex-col justify-start items-center inline-flex"
>
	<div class="text-center text-white text-4xl font-extrabold leading-[45px]">Latest Training</div>

	<div
		class="inline-flex items-center gap-4 justify-center mt-5 w-full"
	>
		<LatestTrainingCard
			v-for="course in chunkedTrainings"
			:course="course"
			class="w-1/3"
		/>
	</div>
</div>
</template>