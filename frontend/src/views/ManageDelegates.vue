<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import { getLocalStorageData } from '@/core/storage';
import { useUserStore } from '@/stores/user.store';
import { ref } from 'vue';

const user = useUserStore()

const usernameLookup = ref('')

async function createRelationship() {
	const existingUser = getLocalStorageData().allUsers?.find(x => x.userName == usernameLookup.value)

	if (!existingUser)
		return false

	await user.createRelationship({
		parentGuid: user.guid!,
		childGuid: existingUser.guid!,
		relationshipType: 'adviser-delegate'
	})

	await user.fetchAllPossibleRelations()
}

await user.fetchAllPossibleRelations()

</script>

<template>
<div class="p-20">
	<div class=" text-white text-4xl font-extrabold leading-[45px]">Manage Delegates</div>

	<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
		<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" class="px-6 py-3">
						Name
					</th>
					<th scope="col" class="px-6 py-3">
						User Name
					</th>
					<th scope="col" class="px-6 py-3">
						
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="delegate in user.relatedDelegates"
					class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
				>
					<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
						{{ delegate.firstName }} {{ delegate.lastName }}
					</th>
					<td class="px-6 py-4">
						{{ delegate.userName }}
					</td>
					<td class="px-6 py-4">
						<a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div>
		<BaseInput
			v-model="usernameLookup"
			label="Username"
		/>
		<BaseButton @click="createRelationship">
			Add
		</BaseButton>
	</div>
</div>
</template>