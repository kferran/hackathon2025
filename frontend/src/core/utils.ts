export function chunk<T>(items : T[], chunkSize : number) {
	const chunked = []
	for (let i = 0; i < items.length; i += chunkSize) {
		chunked.push(items.slice(i, i + chunkSize));
	}

	return chunked
}