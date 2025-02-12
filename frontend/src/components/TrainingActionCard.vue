<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import Card from '@/components/Card.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import Icon from '@/components/Icon.vue';
import nwLogoUrl from '@/assets/nationwide-logo.png'
import atheneLogo from '@/assets/athene-logo.png'
import { getEstimatedTrainingTimeInMinutes, getProductTrainingCompletionPercentage, type ICourse, type IProducerTraining, type IProduct } from '@/core/model';
import { computed } from 'vue';

const props = defineProps<{
	course: ICourse
}>()

const completionPercentage = computed(() =>50)

const minutes = computed(() => 5)

const imageUrl = computed(() => {
	// always return athene until we have stuff from the payload
	return atheneLogo
})

</script>

<template>
	<Card
		:image="imageUrl"
	>
		<ProgressBar
			label="% Complete"
			class="mt-1"
			:percentage="completionPercentage"
			:minutesRemaining="minutes"
		/>

		<div class="text-white text-lg font-bold leading-snug mt-1">{{ course.courseName }}</div>

		<div class="text-gray-400 text-base font-normal leading-normal mt-1">Build your expertise with our latest annuities training module. Learn key concepts, explore product features, and gain insights to better serve your clients. Start learning today!</div>

		<div class="">
			<BaseButton
				class="mt-5"
			>
				Complete Training
			</BaseButton>

			<BaseButton color="alternative" class="inline-flex items-center">
				<Icon name="share" class="mr-1"/>

				Share this training
			</BaseButton>
		</div>
		
	</Card>
</template>