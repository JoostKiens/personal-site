import React from 'react'
import { animated, useTrail, interpolate } from 'react-spring'
import './Sparkle.css'

type SparkleProps = {
	initialDelay: number;
	sparkles: {
		scale: number;
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
	})

	return (
		<div className='SparkleGroup'>
			{trail.map(({ scale }, i) => {
				const { top, left, scale: desiredScale } = sparkles[i]
				return (
					<animated.svg
						style={{
							position: 'absolute',
							top,
							left,
							willChange: 'auto',
							transform: interpolate(
								[scale],
								(x) => `translate(-50%, -50%) scale(${desiredScale * x})`
							),
						}}
						key={i}
						xmlns="http://www.w3.org/2000/svg" width="22" height="30" viewBox="0 0 22 30"
					>
						<path fill="currentColor" d="M10.744 29.624a84.52 84.52 0 0 1 4.92-7.608 86.063 86.063 0 0 1 5.832-7.176C17.304 10.168 13.72 5.24 10.744.056a91.33 91.33 0 0 1-4.8 7.44A80.935 80.935 0 0 1-.008 14.84c4.288 4.832 7.872 9.76 10.752 14.784z"/>
					</animated.svg>
				)
			})}
		</div>
	)
}
