import type { IUser, IUserRelationship, UserRole } from "@/core/model";
import { getLocalStorageData, setLocalStorageData } from "@/core/storage";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore('user', () => {

	const user = ref<IUser | null | undefined>()

	const relatedDelegates = ref<IUser[]>([])

	const relatedAdvisers = ref<IUser[]>([])

	const isAuthorized = ref(false)

	const fetchCurrentUser = async () => {
		const storage = getLocalStorageData()

		if (storage.currentUserGuid) {
			user.value = storage.allUsers?.find(x => x.guid == storage.currentUserGuid)

			isAuthorized.value = true
		}
	}

	const fetchAllPossibleRelations = async () => {
		await fetchDelegates()

		await fetchAdvisers()
	}

	const createRelationship = async (relation : IUserRelationship) => {
		const storage = getLocalStorageData()

		storage.userRelationships = storage.userRelationships ?? []
		storage.userRelationships.push(relation)

		setLocalStorageData(storage)
	}

	const fetchDelegates = async () => {
		const storage = getLocalStorageData()

		const relations = storage.userRelationships
			?.filter(x => x.relationshipType == 'adviser-delegate' && x.parentGuid == user.value?.guid)
			?.map(x => x.childGuid)

		console.log(relations)

		relatedDelegates.value = storage.allUsers?.filter(x => relations?.includes(x.guid ?? '')) ?? []
	}

	const fetchAdvisers = async () => {
		const storage = getLocalStorageData()

		const relations = storage.userRelationships
			?.filter(x => x.relationshipType == 'adviser-delegate' && x.childGuid == user.value?.guid)
			?.map(x => x.parentGuid)

		relatedAdvisers.value = storage.allUsers?.filter(x => relations?.includes(x.guid ?? '')) ?? []
	}

	const login = async (loginUsername : string, loginPassword : string) => {
		const storage = getLocalStorageData()
		
		const existingUser = storage.allUsers?.find(x => x.userName == loginUsername)

		console.log(storage.allUsers, existingUser)

		if (!existingUser)
			return false

		user.value = existingUser
		isAuthorized.value = true

		storage.currentUserGuid = existingUser.guid

		setLocalStorageData(storage)

		return true
	}

	const createNewUser = async (newUser : IUser) => {
		const storage = getLocalStorageData()

		storage.allUsers = storage.allUsers ?? []

		storage.allUsers.push(newUser)

		setLocalStorageData(storage)
	}

	const logout = async () => {
		user.value = null
		relatedAdvisers.value = []
		relatedDelegates.value = []

		const storage = getLocalStorageData()

		storage.currentUserGuid = null

		setLocalStorageData(storage)
	}

	return {
		isAuthorized: computed(() => isAuthorized.value),
		role: computed(() => user.value?.role),
		guid: computed(() => user.value?.guid),
		login,
		logout,
		createNewUser,
		fetchAdvisers,
		fetchDelegates,
		fetchAllPossibleRelations,
		createRelationship,
		fetchCurrentUser,
		relatedDelegates: computed(() => relatedDelegates.value),
		relatedAdvisers: computed(() => relatedAdvisers.value)
	}
})