<script setup lang="ts">
import TrainingActionCard from '@/components/TrainingActionCard.vue';
import { computed } from 'vue';
import { useUserStore } from '@/stores/user.store';
import { chunk } from '@/core/utils';

const user = useUserStore()

const chunkedTrainings = computed(() => user.incompleteRequiredTrainings?.slice(0, 3))
</script>

<template>
<div
	v-if="user.incompleteRequiredTrainings?.length"
	class="w-full p-20 bg-[#111928] flex-col justify-start items-center inline-flex"
>
	<div class="text-center text-white text-4xl font-extrabold leading-[45px]">Training Action Required</div>

	<div class="text-center text-gray-400 text-xl font-normal leading-[30px] mb-5">
		The most pressing training modules that are applicable to your business and clients.
	</div>

	<div
		class="inline-flex items-center gap-4 justify-center mt-5"
	>
		<TrainingActionCard
			v-for="data in chunkedTrainings"
			:course="data.course"
			:carrier="data.carrier"
			:product="data.product"
			class="w-1/3"
		/>
	</div>
</div>
</template>