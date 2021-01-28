import React, { useMemo } from 'react'
import { useElementSize } from '../machinery/useElementSize'
import { useViewport } from '../machinery/Viewport'
import { useScroll } from 'react-use-gesture'
import { animated, useSpring } from 'react-spring'
import './Marquee.css'

export function Marquee({ char = '⦾', direction = 1 }) {
	const {
		ref,
		size: { height },
	} = useElementSize()
	const { viewportHeight, viewportWidth: width } = useViewport()
	const xFactor = (viewportHeight / width) * 0.2

	const count = useMemo(() => {
		if (!height || !width) return 0
		return Math.round(width / height)
	}, [width, height])

  const [props, set] = useSpring(() =>
  	({ x: 0, immediate: true })
	)

	useScroll(
		({ offset: [, y] }) => {
			set({ x: xFactor * y })
		},
		{ domTarget: window }
	)

	return (
		<div className="Marquee" style={{ width }} {...{ ref }}>
			<animated.div
				className="Marquee-row"
				style={{
					willChange: 'auto',
					transform: props.x.to((x) => `translateX(${direction * x}px)`)
				}}
			>
				{[...Array(count * 1)].map((_, i) => (
					<div
						style={{ width: height, height: height }}
						className="Marquee-item"
						key={i}
					>
						{char}
					</div>
				))}
			</animated.div>
		</div>
	)
}
