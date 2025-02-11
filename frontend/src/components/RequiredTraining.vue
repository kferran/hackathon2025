<script setup lang="ts">
import TrainingActionCard from '@/components/TrainingActionCard.vue';
import { getProductTrainingCompletionPercentage, type IProducerTraining } from '@/core/model';
import { computed } from 'vue';

const props = defineProps<{
	producerTraining: IProducerTraining | undefined
}>()

const productsRequiringTraining = computed(
	() => props.producerTraining?.products?.filter(x => getProductTrainingCompletionPercentage(x) != 1)
)
</script>

<template>
<div
	class="w-full p-20 bg-[#111928] flex-col justify-start items-center inline-flex"
>
	<div class="text-center text-white text-4xl font-extrabold leading-[45px]">Training Action Required</div>

	<div class="text-center text-gray-400 text-xl font-normal leading-[30px] mb-5">
		The most pressing training modules that are applicable to your business and clients.
	</div>

	<div class="inline-flex items-center gap-4 justify-center">
		<TrainingActionCard
			v-for="product in productsRequiringTraining"
			class="w-1/3"
			:product="product"
		/>
	</div>
</div>
</template>