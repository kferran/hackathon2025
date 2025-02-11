<script setup lang="ts">
import NavLayout from '@/layouts/NavLayout.vue';
import TrainingActionCard from '@/components/TrainingActionCard.vue'
import ProductTable from '@/components/ProductTable.vue';
import Card from '@/components/Card.vue';
import { useTraining } from '@/composables/useTraining';
import { getProductTrainingCompletionPercentage } from '@/core/model';
import { computed } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import Icon from '@/components/Icon.vue';
import TrainingScoreCard from '@/components/TrainingScoreCard.vue';

const { getProductTraining, producerTraining } = useTraining()

await getProductTraining('123123123')
console.log(producerTraining.value)
const anyProductsRequireTraining = producerTraining.value?.products?.some(p => getProductTrainingCompletionPercentage(p) != 1)
</script>
<template>
<NavLayout>
    <div>
		<div class="w-full py-24 bg-[#111928] flex-col justify-start items-center inline-flex">
			<div class="text-center text-white text-4xl font-extrabold leading-[45px]">Upcoming Required Trainings</div>

			<div class="grid grid-cols-3 gap-4 mt-5">
				<Card>
					<div class="text-[#111928] dark:text-white text-2xl font-bold leading-[30px]">
						Continuing Education
					</div>

					<div class="text-gray-500 dark:text-white text-base font-normal leading-normal mt-1">
						Stay informed on the latest annuity products, regulations, and best practices—earn CE credits while sharpening your skills. 
					</div>

					<BaseButton class="inline-flex items-center mt-3">
						<Icon name="share" class="mr-1"/>

						Due 04 Oct 2026
					</BaseButton>
				</Card>

				<Card>
					<div class="text-[#111928] dark:text-white text-2xl font-bold leading-[30px]">
						License Renewal
					</div>

					<div class="text-gray-500 dark:text-white text-base font-normal leading-normal mt-1">
						Stay certified and continue serving your clients with confidence by completing your renewal requirements.
					</div>

					<BaseButton class="inline-flex items-center mt-3">
						<Icon name="share" class="mr-1"/>

						Due 04 Oct 2026
					</BaseButton>
				</Card>

				<TrainingScoreCard />
			</div>
		</div>
        <div
			v-if="anyProductsRequireTraining"
			class="w-full py-24 bg-[#111928] flex-col justify-start items-center inline-flex"
		>
			<div class="text-center text-white text-4xl font-extrabold leading-[45px]">Training Action Required</div>

			<div class="text-center text-gray-400 text-xl font-normal leading-[30px] mb-5">
				The most pressing training modules that are applicable to your business and clients.
			</div>

			<div class="grid grid-cols-2 gap-4">
				<TrainingActionCard
					v-for="product in producerTraining?.products"
					:product="product"
				/>
			</div>
        </div>
        <ProductTable :producerTraining="producerTraining" />
    </div>
</NavLayout>

</template>