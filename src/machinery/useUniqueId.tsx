import { useMemo } from 'react'

let id = 0
const getKey = () => id++

export function useUniqueId(prefix = '') {
	return `${prefix}${useMemo(getKey, [])}`
}
