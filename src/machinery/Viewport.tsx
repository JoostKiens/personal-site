import React, { useState, useContext, createContext } from 'react'
import debounce from 'lodash/debounce'

type Viewport = { viewportWidth: number; viewportHeight: number }
const initialViewport : Viewport = { viewportWidth: 0, viewportHeight: 0 }

const ViewportContext = createContext(initialViewport)

export function useViewport() {
	const viewport = useContext(ViewportContext)
	if (!viewport)
		throw new Error('Please make sure ViewportContextProvider is available')
	return viewport
}

export function ViewportContextProvider(
  { children } : { children: React.ReactNode }
) {
	const viewport = useRawViewport()
	return (
		<ViewportContext.Provider value={viewport}>
			{children}
		</ViewportContext.Provider>
	)
}

function useRawViewport() {
	const [viewport, setViewport] = useState(initialViewport)

	React.useEffect(() => {
		let cancelled = false
		const handleResize = debounce(() => {
			if (!cancelled) updateViewport(setViewport)
		}, 160)

		updateViewport(setViewport)
		window.addEventListener('resize', handleResize)
		return () => {
			cancelled = true
			handleResize.cancel()
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return viewport
}

function updateViewport(setViewport: React.Dispatch<React.SetStateAction<Viewport>>) {
	setViewport((prev : Viewport) => {
		const viewportWidth = document.body.clientWidth
		const viewportHeight = window.innerHeight

		if (
      prev.viewportWidth === viewportWidth &&
      prev.viewportHeight === viewportHeight
    ) return prev

		return { viewportWidth, viewportHeight, }
	})
}
