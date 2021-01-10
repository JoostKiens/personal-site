import React from 'react'
import { animated, useTrail, interpolate, AnimatedValue } from 'react-spring'

type SparkleProps = {
	initialDelay: number;
	sparkles: {
		fontSize: number;
		top: string;
		left: string;
	}[]
}
export function Sparkle({ initialDelay = 0, sparkles }: SparkleProps) {
	const trail = useTrail(sparkles.length, {
		from: { scale: 0 },
		to: { scale: 1 },
		delay: initialDelay,
		config: {
			tension: 240,
			friction: 16,
		},
	}) as AnimatedValue<{ scale: number }[]>

	return (
		<div
			style={{
				height: 240,
				width: 160,
				position: 'relative',
				fontFamily: 'CooperBlack, Cooper Black',
			}}
		>
			{trail.map(({ scale }, i) => {
				const { fontSize, top, left } = sparkles[i]
				return (
					<animated.div
						style={{
							position: 'absolute',
							top,
							left,
							lineHeight: 0.7,
							fontSize,
							willChange: 'transform',
							transform: interpolate(
								[scale],
								(x) => `translate(-50%, -50%) scale(${x})`
							),
						}}
						key={i}
					>
						{'\u2666'}
					</animated.div>
				)
			})}
		</div>
	)
}
