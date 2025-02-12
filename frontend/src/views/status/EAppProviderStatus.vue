<script setup lang="ts">
import UserProductStatus from '@/components/UserProductStatus.vue';
import { useTraining } from '@/composables/useTraining';
import { useRoute } from 'vue-router';
const route = useRoute()
const training = useTraining()

const { user, product } = await training.getStatusData(route.params.userGuid.toString(), route.params.cusip.toString())

</script>

<template>
	<div class="p-20">
		<div class="text-[#111928] dark:text-white text-4xl font-extrabold leading-[45px] mb-5">At the EAppProvider</div>

		<UserProductStatus
			:user="user"
			:product="product"
			:checkCompleteness="product => !!(product?.carrierAuthorization && product?.distributorAuthorization)"
		/>
	</div>
</template>