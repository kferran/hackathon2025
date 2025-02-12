<script setup lang="ts">
import NavLayout from '@/layouts/NavLayout.vue';
import ProductTable from '@/components/ProductTable.vue';
import UpcomingTraining from '@/components/UpcomingTraining.vue';
import RequiredTraining from '@/components/RequiredTraining.vue';
import LatestTraining from '@/components/LatestTraining.vue';
import { useUserStore } from '@/stores/user.store';
import CertiBot from '@/components/CertiBot.vue'
import CertiBotResponses from '@/components/CertiBotResponses.vue'
import { useOverlay } from '@/composables/useOverlay';

const user = useUserStore()
const overlay = useOverlay()

await user.fetchTrainingData()

if (user.role == 'delegate')
	overlay.openAdviserSelectOverlay()

</script>
<template>
<NavLayout>
    <div>
		<Transition name="fade" mode="out-in">
			<div v-if="user.selectedAdviser">
				<RequiredTraining />
				<UpcomingTraining />
				<div id="chat">
					<CertiBotResponses />
					<CertiBot />
				</div>
				<ProductTable />
				<LatestTraining />
			</div>
		</Transition>
    </div>
</NavLayout>

</template>