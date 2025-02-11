<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';

</script>
<template>
<div>
	<p>The login page</p>
	<BaseInput
		label="User Name"
	/>

	<BaseInput
		label="Password"
		type="password"
	/>
</div>
</template>