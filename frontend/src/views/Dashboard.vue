<script setup lang="ts">
import NavLayout from '@/layouts/NavLayout.vue';
import TrainingActionCard from '@/components/TrainingActionCard.vue'
import { useTraining } from '@/composables/useTraining';
import { getProductTrainingCompletionPercentage } from '@/core/model';
import { computed } from 'vue';

const {getProductTraining, producerTraining} = useTraining()

await getProductTraining('1234567890')

const anyProductsRequireTraining = computed(
	() => producerTraining.value?.products.some(p => getProductTrainingCompletionPercentage(p) != 1)
)
</script>
<template>
<NavLayout>
	<div class="w-full py-24 bg-[#111928] flex-col justify-start items-center inline-flex">
		<div v-if="anyProductsRequireTraining">
			<div class="text-center text-white text-4xl font-extrabold leading-[45px]">Training Action Required</div>

			<div class="text-center text-gray-400 text-xl font-normal leading-[30px] mb-5">The most pressing training modules that are applicable to your business and clients.</div>

			<div class="grid grid-cols-2 gap-4">
				<TrainingActionCard
					v-for="product in producerTraining?.products"
					:product="product"
				/>
			</div>
			
		</div>
	</div>
</NavLayout>

</template>