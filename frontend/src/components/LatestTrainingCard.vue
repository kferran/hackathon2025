<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import Card from '@/components/Card.vue';
import Icon from '@/components/Icon.vue';
import { type ICourse} from '@/core/model';
import { computed } from 'vue';
import { useOverlay } from '@/composables/useOverlay';
import { useTraining } from '@/composables/useTraining';

const training = useTraining()
const overlay = useOverlay()

const props = defineProps<{
	course: ICourse
}>()

</script>

<template>
	<Card
		:image="training.resolveTrainingImage(course)"
	>
		<div class="text-white text-lg font-bold leading-snug mt-5">{{ course.courseName }}</div>

		<div class="text-gray-400 text-base font-normal leading-normal mt-1">Learn how it works, explore key riders, and understand how it fits into client strategies</div>

		<div class="">
			<BaseButton color="default" class="inline-flex items-center mt-5">
				<Icon name="shield-check" class="mr-1"/>

				Add to Training Queue
			</BaseButton>
		</div>
		
	</Card>
</template>