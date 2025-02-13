import type { IUser, IUserRelationship } from "./model"

const storageKey = 'hackathon-local'

export interface ILocalStorageData {
	allUsers?: IUser[],
	userRelationships?: IUserRelationship[],
}

export interface ISessionStorageData {
	currentUserGuid?: string | null | undefined
	selectedAdviserGuid?: string | null | undefined
}

export const getLocalStorageData = () : ILocalStorageData => {
	const raw = localStorage.getItem(storageKey)

	return JSON.parse(raw ?? '{}') as ILocalStorageData
}

export const setLocalStorageData = (data : ILocalStorageData) => {
	localStorage.setItem(storageKey, JSON.stringify(data))
}

export const getSessionStorageData = () : ISessionStorageData => {
	const raw = sessionStorage.getItem(storageKey)

	return JSON.parse(raw ?? '{}') as ISessionStorageData
}

export const setSessionStorageData = (data : ISessionStorageData) => {
	sessionStorage.setItem(storageKey, JSON.stringify(data))
}