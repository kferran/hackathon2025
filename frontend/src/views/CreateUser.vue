<script setup lang="ts">
import { ref } from 'vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import type { IUser } from '@/core/model';
import { useUserStore } from '@/stores/user.store';
import router from '@/router';
import { randomGuid } from '@/core/utils';

const newUser = ref<IUser>({
	guid: randomGuid(),
	firstName: '',
	lastName: '',
	userName: '',
	password: '',
	npn: '',
	role: 'adviser'
})

const possibleRoles = [
	{
		value: 'adviser',
		display: 'Adviser'
	},
	{
		value: 'delegate',
		display: 'Delegate'
	}
]

async function handleCreateUser() {
	const user = useUserStore()

	await user.createNewUser(newUser.value)

	router.push({ name: 'admin.storage' })
}
</script>

<template>
	<form class="max-w-md mx-auto py-20">
		<div class=" text-white text-4xl font-extrabold leading-[45px]">Create User</div>

		<div class="mb-5">
			<BaseInput
				label="First Name"
				v-model="newUser.firstName"
			/>
		</div>
		<div class="mb-5">
			<BaseInput
				label="Last Name"
				v-model="newUser.lastName"
			/>
		</div>
		<div class="mb-5">
			<BaseInput
				label="User Name"
				v-model="newUser.userName"
			/>
		</div>

		<div class="mb-5">
			<BaseSelect
				label="Role"
				v-model="newUser.role"
				:options="possibleRoles"
			/>
		</div>

		<div class="mb-5">
			<BaseInput
				label="NPN"
				v-model="newUser.npn"
			/>
		</div>

		<div class="mb-5">
			<BaseInput
				label="Password"
				type="password"
				v-model="newUser.password"
			/>
		</div>

		<BaseButton @click="handleCreateUser">Submit</BaseButton>
	</form>
</template>