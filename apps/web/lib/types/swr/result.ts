export interface ResultOf<T> {
	result: T[]
	meta: {
		total?: number
	}
}
