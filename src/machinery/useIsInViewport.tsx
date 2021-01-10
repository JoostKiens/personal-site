import { useIsIntersecting, useWasIntersecting } from './useIsIntersecting'

type UseInViewportProps = {
  rootMargin?: string;
  threshold?: number;
  disabled?: boolean;
}
export function useIsInViewport({
	rootMargin = undefined,
	threshold = undefined,
	disabled = undefined,
}: UseInViewportProps = {}) {
	const {
		ref,
		isIntersecting: isInViewport,
		wasIntersecting: wasInViewport,
	} = useIsIntersecting({ rootMargin, threshold, disabled })
	return { isInViewport, wasInViewport, ref }
}

export function useWasInViewport({
	rootMargin  = undefined,
	threshold  = undefined,
}: UseInViewportProps = {}) {
	const { wasIntersecting: wasInViewport, ref } = useWasIntersecting({
		rootMargin,
		threshold,
	})
	return { wasInViewport, ref }
}
