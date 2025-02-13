<script setup lang="ts">
import UserProductStatus from '@/components/UserProductStatus.vue';
import { useEndpointPoller } from '@/composables/useEndpointPoller';
import { useToast } from '@/composables/useToast';
import { useTraining } from '@/composables/useTraining';
import type { IProduct, IUser } from '@/core/model';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const training = useTraining()
const poller = useEndpointPoller()
const toast = useToast()
const user = ref<IUser | null | undefined>(null)
const product = ref<IProduct | null | undefined>(null)

const isComplete = (product : IProduct | undefined) => !!product?.carrierAuthorization && !!product?.distributorAuthorization


poller.startPoller(5000, async () => {
	const wasNotComplete = product.value && isComplete(product.value!) != true

	const data = await training.getStatusData(route.params.userGuid.toString(), route.params.cusip.toString())

	user.value = data.user
	product.value = data.product

	if (wasNotComplete && isComplete(product.value))
		toast.push({
			type: 'success',
			message: `We've recieved a training update for ${user.value?.firstName} ${user.value?.lastName}!`,
			timeout: 5000
		})
})
</script>

<template>
	<div class="p-20">
		<div class="text-[#111928] dark:text-white text-4xl font-extrabold leading-[45px] mb-5">At the Carrier</div>

		<UserProductStatus
			:user="user!"
			:product="product!"
			:checkCompleteness="isComplete"
		/>

		<div class="text-[#111928] dark:text-white text-4xl font-extrabold leading-[45px] mb-5 mt-1">At the Clearing House</div>

		<UserProductStatus
			:user="user!"
			:product="product!"
			:checkCompleteness="isComplete"
		/>

		<div class="text-[#111928] dark:text-white text-4xl font-extrabold leading-[45px] mb-5 mt-1">At the Training Provider</div>

		<UserProductStatus
			:user="user!"
			:product="product!"
			:checkCompleteness="isComplete"
		/>

		<div class="text-[#111928] dark:text-white text-4xl font-extrabold leading-[45px] mb-5 mt-1">At the Distribution Partner</div>

		<UserProductStatus
			:user="user!"
			:product="product!"
			:checkCompleteness="isComplete"
		/>

		<div class="text-[#111928] dark:text-white text-4xl font-extrabold leading-[45px] mb-5 mt-1">At the eApp Provider</div>

		<UserProductStatus
			:user="user!"
			:product="product!"
			:checkCompleteness="isComplete"
		/>


	</div>
</template>