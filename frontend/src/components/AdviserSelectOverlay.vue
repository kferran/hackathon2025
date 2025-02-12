<script setup lang="ts">
import { useOverlay } from '@/composables/useOverlay';
import AdviserSelector from '@/components/AdviserSelector.vue';
import BaseButton from '@/components/BaseButton.vue';
import Icon from '@/components/Icon.vue';

const overlay = useOverlay()

function handleClose() {
	overlay.closeOverlay()
}

</script>

<template>
<div class="w-1/4 bg-[#111928] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
	<div class="w-full bg-white rounded-[10px] flex-col justify-start items-center gap-2.5 inline-flex overflow-hidden p-10">
		<div class="flex-col justify-start items-center flex">
			<div class="self-stretch flex-col justify-start items-center gap-4 flex">
				<div class="self-stretch text-center text-[#111928] text-2xl font-extrabold leading-[90px]">Select a Producer</div>
				<div class="text-gray-500 text-base font-normal">Selecting a producer will give you training reporting and needs tailored to that producer. </div>
			
				<AdviserSelector
					class="w-full"
				/>
			</div>
			<div class="justify-start items-start gap-4 inline-flex">
				<div class="relative">
					<!-- <img
						:src="laptop2"
						class="w-[804px] h-[460px] left-0 top-0 absolute bg-[#1f2a37]/50 rounded-lg" 
					/> -->
					<div class="w-20 h-20 left-[362px] top-[190px] absolute">
						<div class="w-20 h-20 left-0 top-0 absolute opacity-50 bg-white rounded-full"></div>
						<div data-svg-wrapper class="left-[22.43px] top-[19.43px] absolute">
						<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M9.0011 9.2348C9.0011 7.65247 10.7516 6.69679 12.0826 7.55245L30.3841 19.3177C31.6087 20.105 31.6087 21.8951 30.3841 22.6824L12.0826 34.4476C10.7516 35.3033 9.0011 34.3476 9.0011 32.7653V9.2348Z" fill="white"/>
						</svg>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="inline-flex items-center w-full justify-center">
			<div class="w-full">
				<BaseButton
					@click="handleClose"
					color="default"
					class="w-full inline-flex items-center gap-1 text-center justify-center"
				>
					<Icon name="shield-check" />
					Submit
				</BaseButton>
			</div>
		</div>
	</div>
</div>
</template>