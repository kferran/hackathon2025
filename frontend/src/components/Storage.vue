<script setup lang="ts">
import { getLocalStorageData } from '@/core/storage';
import { computed } from 'vue';

const payload = computed(() => JSON.stringify(getLocalStorageData(), null, 4))
</script>

<template>
	<pre class="dark:text-white p-20">{{ payload }}</pre>
</template>