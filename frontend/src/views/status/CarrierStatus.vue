<script setup lang="ts">
import UserProductStatus from '@/components/UserProductStatus.vue';
import { useEndpointPoller } from '@/composables/useEndpointPoller';
import { useToast } from '@/composables/useToast';
import { useTraining } from '@/composables/useTraining';
import type { IProduct, IUser } from '@/core/model';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const training = useTraining()
const poller = useEndpointPoller()
const toast = useToast()
const user = ref<IUser | null | undefined>(null)
const product = ref<IProduct | null | undefined>(null)

const carrierIsComplete = ref(false)
const clearingHouseIsComplete = ref(false)
const trainingProviderIsComplete = ref(false)
const dpIsComplete = ref(false)
const eAppIsComplete = ref(false)

export interface IEventRecord {
	broadcastId: string
	eventHash: string
	completionTime: string
	updates: Array<{
		distributor: string
		distributorId: string
		recievedTime: string
	}>
}

export interface IEventResponse {
	broadcastRecords: IEventRecord[]
}

function parseEventHash(record : IEventRecord) {
	// {npn}#{carrier}#{cusip}#{courseId}#{course.status}#{now.ToString()}
	const [
		npn,
		carrier,
		cusip,
		courseId,
		status,
		eventDate
	] = record.eventHash.split('#')

	return {
		npn,
		carrier,
		cusip,
		courseId,
		status,
		eventDate
	}
}

onMounted(async () => {
	const trainingData = await training.getStatusData(route.params.userGuid.toString(), route.params.cusip.toString())

	user.value = trainingData.user
	product.value = trainingData.product
})


poller.startPoller(1000, async () => {
	const data = await fetch('https://2wa27e5crg.execute-api.us-west-2.amazonaws.com/v1/receive-publish/query', 
		{
			method: 'POST'
		}
	).then(res => res.json()) as never as IEventResponse

	const completeRecords = data.broadcastRecords.filter(x => {
		const hash = parseEventHash(x)

		return hash.status == 'Complete' && hash.npn == user.value?.npn && hash.cusip == route.params.cusip
	})

	console.log(completeRecords.length, completeRecords[0]?.updates)

	const completeUpdates = completeRecords?.flatMap(x => x.updates) ?? []

	console.log(completeUpdates)

	const completeCarrierUpdate = completeUpdates.some(x => x.distributorId == 'tc')
	const completeClearingHouseUpdate = completeUpdates.some(x => x.distributorId == 'ch')
	const completeTrainingProviderUpdate = completeUpdates.some(x => x.distributorId == 'tv')
	const completeDpUpdate = completeUpdates.some(x => x.distributorId == 'dp')
	const completeEAppUpdate = completeUpdates.some(x => x.distributorId == 'tep')

	const messages = []

	if (!carrierIsComplete.value && completeCarrierUpdate) {
		messages.push('Carrier')
		carrierIsComplete.value = true
	}

	if (!clearingHouseIsComplete.value && completeClearingHouseUpdate) {
		messages.push('Clearing House')
		clearingHouseIsComplete.value = true
	}

	if (!trainingProviderIsComplete.value && completeTrainingProviderUpdate) {
		messages.push('Training Provider')
		trainingProviderIsComplete.value = true
	}

	if (!dpIsComplete.value && completeDpUpdate) {
		messages.push('Distribution Partner')
		dpIsComplete.value = true
	}

	if (!eAppIsComplete.value && completeEAppUpdate) {
		messages.push('EApp Provider')
		eAppIsComplete.value = true
	}

	messages.forEach(x => toast.push({
		type: 'success',
		message: `${x} recieved a training update for ${user.value?.firstName} ${user.value?.lastName}!`,
		timeout: 5000
	}))
})
</script>

<template>
	<div class="p-20">
		<div class="text-[#111928] dark:text-white text-4xl font-extrabold leading-[45px] mb-5">At the Carrier</div>

		<UserProductStatus
			:user="user!"
			:product="product!"
			:isComplete="carrierIsComplete"
		/>

		<div class="text-[#111928] dark:text-white text-4xl font-extrabold leading-[45px] mb-5 mt-1">At the Clearing House</div>

		<UserProductStatus
			:user="user!"
			:product="product!"
			:isComplete="clearingHouseIsComplete"
		/>

		<div class="text-[#111928] dark:text-white text-4xl font-extrabold leading-[45px] mb-5 mt-1">At the Training Provider</div>

		<UserProductStatus
			:user="user!"
			:product="product!"
			:isComplete="trainingProviderIsComplete"
		/>

		<div class="text-[#111928] dark:text-white text-4xl font-extrabold leading-[45px] mb-5 mt-1">At the Distribution Partner</div>

		<UserProductStatus
			:user="user!"
			:product="product!"
			:isComplete="dpIsComplete"
		/>

		<div class="text-[#111928] dark:text-white text-4xl font-extrabold leading-[45px] mb-5 mt-1">At the eApp Provider</div>

		<UserProductStatus
			:user="user!"
			:product="product!"
			:isComplete="eAppIsComplete"
		/>


	</div>
</template>