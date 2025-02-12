<script setup lang="ts">
import NavLayout from '@/layouts/NavLayout.vue';
import TrainingActionCard from '@/components/TrainingActionCard.vue'
import ProductTable from '@/components/ProductTable.vue';
import { useTraining } from '@/composables/useTraining';
import { getProductTrainingCompletionPercentage } from '@/core/model';
import UpcomingTraining from '@/components/UpcomingTraining.vue';
import RequiredTraining from '@/components/RequiredTraining.vue';
import { computed } from 'vue';
import { useUserStore } from '@/stores/user.store';

const { producerTraining, getProductTraining } = useTraining()
const user = useUserStore()

await getProductTraining(user.npn)

const anyProductsRequireTraining = computed(() => {
	return producerTraining.value?.products?.some(p => getProductTrainingCompletionPercentage(p) != 1)
})

</script>
<template>
<NavLayout>
    <div>
		<RequiredTraining 
			v-if="anyProductsRequireTraining"
			:producerTraining="producerTraining"
		/>
		
		<UpcomingTraining />

        <ProductTable :producerTraining="producerTraining" />
    </div>
</NavLayout>

</template>