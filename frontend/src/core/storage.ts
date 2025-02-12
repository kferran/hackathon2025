import type { IUser, IUserRelationship } from "./model"

const localStorageKey = 'hackathon-local'

export interface ILocalStorageData {
	allUsers?: IUser[],
	userRelationships?: IUserRelationship[],
	currentUserGuid?: string | null | undefined
}

export const getLocalStorageData = () : ILocalStorageData => {
	const raw = localStorage.getItem(localStorageKey)

	return JSON.parse(raw ?? '{}') as ILocalStorageData
}

export const setLocalStorageData = (data : ILocalStorageData) => {
	localStorage.setItem(localStorageKey, JSON.stringify(data))
}