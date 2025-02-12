import { useTraining } from "@/composables/useTraining";
import { ProducerTraining, type IProducerTraining, type IUser, type IUserRelationship, type UserRole } from "@/core/model";
import { getLocalStorageData, getSessionStorageData, setLocalStorageData, setSessionStorageData } from "@/core/storage";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore('user', () => {

	const user = ref<IUser | null | undefined>()

	const selectedAdviser = ref<IUser | null | undefined>()

	const relatedDelegates = ref<IUser[]>([])

	const relatedAdvisers = ref<IUser[]>([])

	const isAuthorized = ref(false)

	const trainingData = ref<IProducerTraining | null>(null)

	const fetchTrainingData = async () => {
		const { getProductTraining } = useTraining()

		const fetchedTrainingData = await getProductTraining(selectedAdviser.value?.npn ?? '')

		trainingData.value = fetchedTrainingData
	}

	const fetchCurrentUser = async () => {
		const storage = getLocalStorageData()
		const storageSession = getSessionStorageData()

		if (storageSession.currentUserGuid) {
			user.value = storage.allUsers?.find(x => x.guid == storageSession.currentUserGuid)

			if (user.value?.role == 'adviser') {
				selectedAdviser.value = user.value
				storageSession.selectedAdviserGuid = user.value.guid
			} else if (storageSession.selectedAdviserGuid) {
				await setSelectedAdviserByGuid(storageSession.selectedAdviserGuid)
			}
			
			isAuthorized.value = true
		}

		setSessionStorageData(storageSession)

		await fetchAllPossibleRelations()
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

	const setSelectedAdviserByGuid = async (guid : string) => {
		const storageSession = getSessionStorageData()
		const user = relatedAdvisers.value.find(x => x.guid == guid)

		if (!user) {
			selectedAdviser.value = null
			storageSession.selectedAdviserGuid = ''

			return
		}

		selectedAdviser.value = user
		storageSession.selectedAdviserGuid = user?.guid ?? ''

		setSessionStorageData(storageSession)

		await fetchTrainingData()
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

		if (user.value?.role == 'adviser')
			selectedAdviser.value = user.value

		storageSession.currentUserGuid = existingUser.guid

		setLocalStorageData(storageLocal)
		setSessionStorageData(storageSession)

		await fetchAllPossibleRelations()

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
		selectedAdviser.value = null
		trainingData.value = null

		const storage = getLocalStorageData()
		const storageSession = getSessionStorageData()

		storageSession.currentUserGuid = null
		storageSession.selectedAdviserGuid = null

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
		fetchTrainingData,
		setSelectedAdviserByGuid,
		selectedAdviserGuid: computed(() => selectedAdviser.value?.guid),
		selectedAdviser: computed(() => selectedAdviser.value),
		relatedDelegates: computed(() => relatedDelegates.value),
		relatedAdvisers: computed(() => relatedAdvisers.value),
		trainingData: computed(() => trainingData.value),
		allProducts: (computed(
			() => trainingData.value?.carriers
			?.flatMap(x => x.products)
			?? []
		)),
		allUniqueProducts: computed(() => {
			const names = new Set()

			const allProducts = []

			const productsToCheck = trainingData.value?.carriers?.flatMap(x => x.products) ?? []

			for (const p of productsToCheck) {
				if (!names.has(p.name)) {
					allProducts.push(p)
					names.add(p.name)
				}
			}

			return allProducts
		}),
		allProductsWithCarrier: (computed(
			() => trainingData.value?.carriers
			?.flatMap(carrier => carrier?.products?.map(product => ({
				product,
				carrier
			})))
			?? []
		)),
		allCarriers: (computed(
			() => trainingData.value?.carriers
			?? []
		)),
		incompleteRequiredTrainings: computed(
			() => trainingData.value?.carriers
				?.flatMap(x => x?.products)
				?.flatMap(x => x?.courses)
				?.filter(course => course?.status != 'Elective' && course?.status != 'Completed')
				?? []
		),
		incompleteNonRequiredTrainings: computed(
			() => trainingData.value?.carriers
				?.flatMap(x => x?.products)
				?.flatMap(x => x?.courses)
				?.filter(course => course?.status == 'Elective')
				?? []
		),
	}
})