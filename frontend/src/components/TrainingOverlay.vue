<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useOverlay } from '@/composables/useOverlay';
import laptop2 from '@/assets/laptop2.jpg'
import { useUserStore } from '@/stores/user.store';
import { useToast } from '@/composables/useToast';
import { ref } from 'vue';

const props = defineProps<{
	carrierId: string,
	cusip: string,
	courseId: string
}>()

const updating = ref(false)

const overlay = useOverlay()
const user = useUserStore()
const toast = useToast()

function handleClose() {
	overlay.closeOverlay()
}

async function handleCompleteTraining() {
	updating.value = true
	await fetch(
		`https://2wa27e5crg.execute-api.us-west-2.amazonaws.com/v1/receive-publish/complete/${user.selectedAdviser?.npn}/${props.carrierId}/${props.cusip}/${props.courseId}`,
		{
			method: 'POST'
		}
	).catch(error => {
		console.log(error)

		toast.push({
			message: 'There was an issue updating training',
			type: 'error',
			timeout: 5000
		})
	}).finally(() => {
		updating.value = false
	})

	await user.fetchTrainingData()
	handleClose()
}
</script>

<template>
	<div class="w-5/6 bg-white rounded-[90px] flex-col justify-start items-center gap-2.5 inline-flex overflow-hidden pb-10">
		<div class="inline-flex w-[90%] justify-end mt-5">
			<div 
				data-svg-wrapper class="relative cursor-pointer"
				@click="handleClose"
			>
				<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M19.4944 16.5L30.7035 5.29095C30.9057 5.0956 31.0671 4.86192 31.1781 4.60355C31.289 4.34518 31.3475 4.0673 31.3499 3.78611C31.3524 3.50492 31.2988 3.22606 31.1923 2.9658C31.0858 2.70554 30.9286 2.46909 30.7297 2.27026C30.5309 2.07142 30.2944 1.91417 30.0342 1.80769C29.7739 1.70121 29.4951 1.64763 29.2139 1.65007C28.9327 1.65252 28.6548 1.71094 28.3964 1.82192C28.1381 1.93291 27.9044 2.09424 27.709 2.29651L16.5 13.5056L5.29095 2.29651C4.89154 1.91075 4.35661 1.69729 3.80135 1.70212C3.24609 1.70694 2.71494 1.92966 2.3223 2.3223C1.92966 2.71494 1.70694 3.24609 1.70212 3.80135C1.69729 4.35661 1.91075 4.89154 2.29651 5.29095L13.5056 16.5L2.29651 27.709C2.09424 27.9044 1.93291 28.1381 1.82192 28.3964C1.71094 28.6548 1.65252 28.9327 1.65007 29.2139C1.64763 29.4951 1.70121 29.7739 1.80769 30.0342C1.91417 30.2944 2.07142 30.5309 2.27026 30.7297C2.46909 30.9286 2.70554 31.0858 2.9658 31.1923C3.22606 31.2988 3.50492 31.3524 3.78611 31.3499C4.0673 31.3475 4.34518 31.289 4.60355 31.1781C4.86192 31.0671 5.0956 30.9057 5.29095 30.7035L16.5 19.4944L27.709 30.7035C28.1084 31.0892 28.6434 31.3027 29.1986 31.2979C29.7539 31.293 30.285 31.0703 30.6777 30.6777C31.0703 30.285 31.293 29.7539 31.2979 29.1986C31.3027 28.6434 31.0892 28.1084 30.7035 27.709L19.4944 16.5Z" fill="#1F2A37"/>
				</svg>
			</div>
		</div>
		<div class="h-[734px] flex-col justify-start items-center gap-12 flex">
			<div class="self-stretch h-[226px] flex-col justify-start items-center gap-4 flex">
				<div class="self-stretch text-center text-[#111928] text-6xl font-extrabold leading-[90px]">Product Training Video</div>
				<div class="w-[768px] text-center text-gray-500 text-xl font-normal leading-[30px]">Discover the features and benefits of our latest annuity product with our new training module video. Learn how it works, explore key riders, and understand how it fits into client strategies. Interactive lessons and real-world scenarios will help you confidently present this solution to your clients.</div>
			</div>
			<div class="w-[800px] h-[460px] justify-start items-start gap-4 inline-flex">
				<div class="w-[804px] h-[460px] relative">
					<img
						:src="laptop2"
						class="w-[804px] h-[460px] left-0 top-0 absolute bg-[#1f2a37]/50 rounded-lg" 
					/>
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

		<div class="inline-flex items-center w-full justify-center mt-5">
			<div class="w-1/3">
				<BaseButton
					@click="handleCompleteTraining"
					:color="updating ? 'alternative' : 'default'"
					class="w-full inline-flex items-center gap-1 text-center justify-center"
				>
					<template v-if="updating">
						<div role="status">
							<svg aria-hidden="true"
								class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
								viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor" />
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentFill" />
							</svg>
							<span class="sr-only">Loading...</span>
						</div>
					</template>
					<template v-else>
						<Icon name="shield-check" />
						Complete My Training
					</template>
				</BaseButton>
			</div>
		</div>
	</div>
</template>