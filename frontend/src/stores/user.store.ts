import type { IUser, IUserRelationship, UserRole } from "@/core/model";
import { getLocalStorageData, getSessionStorageData, setLocalStorageData, setSessionStorageData } from "@/core/storage";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore('user', () => {

	const user = ref<IUser | null | undefined>()

	const relatedDelegates = ref<IUser[]>([])

	const relatedAdvisers = ref<IUser[]>([])

	const isAuthorized = ref(false)

	const fetchCurrentUser = async () => {
		const storage = getLocalStorageData()
		const storageSession = getSessionStorageData()

		if (storageSession.currentUserGuid) {
			user.value = storage.allUsers?.find(x => x.guid == storageSession.currentUserGuid)

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
		const storageLocal = getLocalStorageData()
		const storageSession = getSessionStorageData()
		
		const existingUser = storageLocal.allUsers?.find(x => x.userName == loginUsername)

		if (!existingUser)
			return false

		user.value = existingUser
		isAuthorized.value = true

		storageSession.currentUserGuid = existingUser.guid

		setLocalStorageData(storageLocal)
		setSessionStorageData(storageSession)

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
		const storageSession = getSessionStorageData()

		storageSession.currentUserGuid = null

		setLocalStorageData(storage)
		setSessionStorageData(storageSession)
	}

	return {
		isAuthorized: computed(() => isAuthorized.value),
		role: computed(() => user.value?.role),
		guid: computed(() => user.value?.guid),
		npn: computed(() => user.value?.npn ?? '123456789'),
		name: computed(() => `${user.value?.firstName} ${user.value?.lastName}`),
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