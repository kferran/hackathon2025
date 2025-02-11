<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import router from '@/router';
import { useUserStore } from '@/stores/user.store';
import { ref } from 'vue';

const username = ref('')
const password = ref('')

async function handleLogin() {
	const userStore = useUserStore()

	const success = await userStore.login(username.value, password.value)

	if (success)
		return router.push({ name: 'dashboard' })

	console.error('login did not work')
}

</script>
<template>
<div>
	<p>The login page</p>

	<form class="max-w-sm mx-auto">
		<div class="mb-5">
			<BaseInput
				label="User Name"
			/>
		</div>
		<div class="mb-5">
			<BaseInput
				label="Password"
				type="password"
			/>
		</div>

		<BaseButton @click="handleLogin">Submit</BaseButton>
	</form>
</div>
</template>