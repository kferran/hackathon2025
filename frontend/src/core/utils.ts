export function chunk<T>(items : T[], chunkSize : number) {
	const chunked = []
	for (let i = 0; i < items.length; i += chunkSize) {
		chunked.push(items.slice(i, i + chunkSize));
	}

	return chunked
}

export function randomGuid() {
	return uuidv4()
}

function uuidv4() {
	//return crypto.randomUUID()
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
		(+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
	);
}