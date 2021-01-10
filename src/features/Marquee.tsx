import React, { useMemo } from 'react'
import { useElementSize } from '../machinery/useElementSize'
import { useViewport } from '../machinery/Viewport'
import { useScroll } from 'react-use-gesture'
import { animated, useSpring, AnimatedValue } from 'react-spring'
import './Marquee.css'

export function Marquee({ char = '⦾', direction = 1 }) {
	const {
		ref,
		size: { width, height },
	} = useElementSize()
	const { viewportHeight } = useViewport()
	const xFactor = (viewportHeight / width) * 0.2

	const count = useMemo(() => {
		if (!height || !width) return 0
		return Math.round(width / height)
	}, [width, height])

  const [props, set] = useSpring(() =>
  ({ x: 0, immediate: true })
) as [AnimatedValue<{ x: number }>, (props: { x: number; }) => void]

	useScroll(
		({ offset: [, y] }) => {
			set({ x: xFactor * y })
		},
		{ domTarget: window }
	)

	return (
		<div className="Marquee">
			<div className="Marquee-banner" {...{ ref }}>
				<animated.div
					className="Marquee-row"
					style={{
            willChange: 'transform',
            transform: props.x.interpolate((x) => `translateX(${direction * x}px)`)
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
		</div>
	)
}
