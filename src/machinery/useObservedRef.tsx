import React from 'react'

export function useObservedRef(
  { createObserver, reset, disabled }:
  { createObserver: () => ResizeObserver; reset: () => void; disabled ?: boolean; }
) {
	const currentNodeRef = React.useRef<HTMLElement | null>(null)
	const observerRef = React.useRef<ResizeObserver | null>(null)

	React.useEffect(() => {
		if (disabled) return

		const observer = createObserver()
		const node = currentNodeRef.current
		if (node) observer.observe(node)
		observerRef.current = observer

		return () => {
			observer.disconnect()
			observerRef.current = null
		}
	}, [createObserver, disabled])

	const ref = React.useCallback(
		(node) => {
			const previous = currentNodeRef.current
			const observer = observerRef.current

			if (previous && observer) observer.unobserve(previous)
			if (node && observer) observer.observe(node)
			if (previous && !node) reset()

			currentNodeRef.current = node
		},
		[reset]
	)

	return ref
}
