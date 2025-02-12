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


</script>
<template>
<NavLayout>
    <div>
		<Transition name="fade">
			<div
				v-if="overlay.component.value"
				class="w-full p-20 bg-[#111928] flex-col justify-start items-center inline-flex"
			>
				<component
					:is="overlay.component.value"
					v-bind="overlay.props.value"
				/>
			</div>
		</Transition>

		<Transition name="fade">
			<div v-if="!overlay.component.value">
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