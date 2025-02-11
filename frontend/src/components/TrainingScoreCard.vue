<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import Card from '@/components/Card.vue';
import Icon, { type IconName } from '@/components/Icon.vue';
import { computed } from 'vue';

const trainings = computed(() => [
	{
		label: 'Product Training',
		completionPercentage: 50,
		icon: 'shield-check'
	},
	{
		label: 'Dsitribution Group Training',
		completionPercentage: 40,
		icon: 'folder'
	},
	{
		label: 'Licensing Training',
		completionPercentage: 100,
		icon: 'finger-print'
	},
	{
		label: 'State Appointments',
		completionPercentage: 20,
		icon: 'map'
	},
	{
		label: 'Continuing Education',
		completionPercentage: 100,
		icon: 'building'
	}
])
</script>

<template>
<Card>
	<div class="text-[#111928] dark:text-white text-[28px] font-extrabold leading-[35px]">My Training Scorecard</div>

	<div
		v-for="training in trainings"
		class="mb-3 inline-flex w-full gap-4"
	>
		<div class="w-2/3">
			<div class="flex justify-between mb-1">
				<span class="text-base font-medium text-blue-700 dark:text-white">{{ training.label }}</span>
				<span class="text-sm font-medium text-blue-700 dark:text-white">{{ training.completionPercentage }}%</span>
			</div>
			<div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
				<div 
					class=" h-2.5 rounded-full"
					:class="{
						'bg-blue-600': training.completionPercentage !== 100,
						'bg-green-600': training.completionPercentage == 100
					}"
					:style="`width: ${training.completionPercentage}%`"
				></div>
			</div>
		</div>

		<div class="w-1/3">
			<BaseButton
				:color="training.completionPercentage == 100 ? 'green' : 'default'"
				class="w-full inline-flex items-center gap-1 text-center"
				
			>
				<Icon :name="training.icon as IconName" />
				{{ training.completionPercentage == 100 ? 'Complete' : 'Train Now' }}
			</BaseButton>
		</div>

	</div>
</Card>
</template>