<script setup lang="ts">
import NavLayout from '@/layouts/NavLayout.vue';
import TrainingActionCard from '@/components/TrainingActionCard.vue'
import ProductTable from '@/components/ProductTable.vue';
import { useTraining } from '@/composables/useTraining';
import { getProductTrainingCompletionPercentage } from '@/core/model';
import { computed } from 'vue';
import UpcomingTraining from '@/components/UpcomingTraining.vue';
import RequiredTraining from '@/components/RequiredTraining.vue';

const { getProductTraining, producerTraining } = useTraining()

await getProductTraining('123123123')
console.log(producerTraining.value)
const anyProductsRequireTraining = producerTraining.value?.ProductDetails?.some(p => getProductTrainingCompletionPercentage(p) != 1)
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