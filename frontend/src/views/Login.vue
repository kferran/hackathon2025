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
	<div class=" text-white text-4xl font-extrabold leading-[45px]">Login</div>

	<form class="max-w-sm mx-auto">
		<div class="mb-5">
			<BaseInput
				v-model="username"
				label="User Name"
			/>
		</div>
		<div class="mb-5">
			<BaseInput
				v-model="password"
				label="Password"
				type="password"
			/>
		</div>

		<BaseButton @click="handleLogin">Submit</BaseButton>
	</form>
</div>
</template>