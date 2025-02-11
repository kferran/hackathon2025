<script setup lang="ts">
import Card from '@/components/Card.vue';
import TrainingScoreCard from '@/components/TrainingScoreCard.vue';
import Icon from '@/components/Icon.vue';
import BaseButton from '@/components/BaseButton.vue';
</script>

<template>
<div class="w-full py-24 bg-[#111928] flex-col justify-start inline-flex">
	<div class="inline-flex w-full gap-4 my-5 p-5">
		<div class="w-1/2">
			<div class=" text-white text-4xl font-extrabold leading-[45px]">Upcoming Required Trainings</div>

			<div class="inline-flex w-full gap-4 my-5">
				<Card class="w-1/2">
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

				<Card class="w-1/2">
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
			</div>

			<a
				href="#"
				class="text-[#3f83f8] text-lg font-normal leading-[27px]"
			>View Upcoming Training Calendar</a>
		</div>
		<div class="w-1/2">
			<TrainingScoreCard
				class="w-full"
			/>
		</div>
	</div>
</div>
</template>