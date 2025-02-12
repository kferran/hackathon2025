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
import CertiBot from '@/components/CertiBot.vue'

const user = useUserStore()

await user.fetchTrainingData()
</script>
<template>
<NavLayout>
    <div>
		<RequiredTraining />
		
		<UpcomingTraining />

		<CertiBot/>
        <ProductTable />
    </div>
</NavLayout>

</template>