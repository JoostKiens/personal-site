import React from 'react'
import { useObservedRef } from './useObservedRef'

type UseisIntersectingProps = {
	root?: HTMLElement;
  rootMargin?: string;
  threshold?: number;
  disabled?: boolean;
}
export function useIsIntersecting({
	root,
	rootMargin,
	threshold,
	disabled,
} : UseisIntersectingProps) {
	const [isIntersecting, setIsIntersecting] = React.useState(false)
	const [wasIntersecting, setWasIntersecting] = React.useState(false)
	const createObserver = React.useCallback(
		() =>
			new window.IntersectionObserver(
				([entry]) => {
					setIsIntersecting(entry.isIntersecting)
					setWasIntersecting(
						(wasIntersecting) => wasIntersecting || entry.isIntersecting
					)
				},
				{ root, rootMargin, threshold }
			),
		[root, rootMargin, threshold]
	)

	const reset = React.useCallback(() => {
		setIsIntersecting(false)
	}, [])
	const ref = useObservedRef({ createObserver, reset, disabled })

	return { ref, isIntersecting, wasIntersecting }
}

export function useWasIntersecting({
	root,
	rootMargin,
	threshold,
}: UseisIntersectingProps) {
	const [disabled, setDisabled] = React.useState(false)
	const { ref, wasIntersecting } = useIsIntersecting({
		root,
		rootMargin,
		threshold,
		disabled,
	})

	React.useEffect(() => {
		wasIntersecting && setDisabled(true)
	}, [wasIntersecting])

	return { wasIntersecting, ref }
}
