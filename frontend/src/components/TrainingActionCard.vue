<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import Card from '@/components/Card.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import Icon from '@/components/Icon.vue';
import nwLogoUrl from '@/assets/nationwide-logo.png'

</script>

<template>
	<Card
		:image="nwLogoUrl"
	>
		<ProgressBar
			label="% Complete"
			class="mt-1"
			:percentage="50"
		/>

		<div class="text-white text-lg font-bold leading-snug mt-1">{Product Name Here}</div>

		<div class="text-gray-400 text-base font-normal leading-normal mt-1">Build your expertise with our latest annuities training module. Learn key concepts, explore product features, and gain insights to better serve your clients. Start learning today!</div>

		<div>
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