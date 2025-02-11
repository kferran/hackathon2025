<script setup lang="ts">
import TrainingActionCard from '@/components/TrainingActionCard.vue';
import type { IProducerTraining } from '@/core/model';

const props = defineProps<{
	producerTraining: IProducerTraining | undefined
}>()
</script>

<template>
<div
	class="w-full py-24 bg-[#111928] flex-col justify-start items-center inline-flex"
>
	<div class="text-center text-white text-4xl font-extrabold leading-[45px]">Training Action Required</div>

	<div class="text-center text-gray-400 text-xl font-normal leading-[30px] mb-5">
		The most pressing training modules that are applicable to your business and clients.
	</div>

	<div class="grid grid-cols-2 gap-4">
		<TrainingActionCard
			v-for="product in producerTraining?.ProductDetails ?? []"
			:product="product"
		/>
	</div>
</div>
</template>