// Inspired by https://cdn.jsdelivr.net/gh/niccolomiranda/m-m@f18803d/ink-minify.js
import React, { useCallback, useRef, useEffect, useMemo } from 'react'
import { useUniqueId } from '../machinery/useUniqueId'
import { useMove } from 'react-use-gesture'
import { animated, useSprings } from 'react-spring'

const amount = 20
const width = 40
const trailAmount = 0.35

export function Ink() {
	const mousePositionRef = useRef([0, 0])
	const hasMovedRef = useRef(false)
	const id = useUniqueId()
	const isGecko = useMemo(() => {
		const regex1 = /Gecko\/\d+/g
		const regex2 = /rv:\d+/g
		const ua = window.navigator.userAgent
		return ua.match(regex1) && ua.match(regex2)
	}, [])

	const [springs, setSprings] = useSprings(amount, (index) => {
		const scale = 1 - 0.05 * index
		return {
			xy: [0, 0],
			scale,
			angle: [0, 0],
			opacity: 0,
			range: width / 2 - (width / 2) * scale + 2,
		}
	})

	useMove(
		({ values: [x, y] }) => {
			mousePositionRef.current = [x, y]
			hasMovedRef.current = true
		},
		{ domTarget: window }
	)

	const draw = useCallback(() => {
		let x = mousePositionRef.current[0]
		let y = mousePositionRef.current[1]

		setSprings((index) => {
			var next = springs[index + 1] || springs[0]
			const [nextX, nextY] = next.xy.get()
			const [resX, resY] = [x, y]
			x += (nextX - resX) * trailAmount
			y += (nextY - resY) * trailAmount

			return {
				xy: [resX, resY],
				opacity: hasMovedRef.current ? 1 : 0,
				immediate: true,
			}
		})
	}, [setSprings, springs])

	useRaf({ callback: draw })

	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				style={{ height: 0, width: 0, position: 'absolute' }}
			>
				<defs>
					<filter {...{ id }}>
						<feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
							result="goo"
						/>
						<feComposite in="SourceGraphic" in2="goo" operator="atop" />
					</filter>
				</defs>
			</svg>
			<div
				style={{
					position: 'fixed',
					top: -width / 2,
					left: -width / 2,
					zIndex: 1,
					mixBlendMode: 'difference',
					filter: isGecko ? 'none' : `url(#${id})`,
					pointerEvents: 'none',
				}}
			>
				{springs.map(({ xy, scale, opacity }, i) => {
					return (
					<animated.div
						key={i}
						style={{
							transform: xy.to(
								(x, y) => `translate3d(${x}px, ${y}px, 0) scale(${scale.get()})`
							),
							width,
							height: width,
							borderRadius: '50%',
							position: 'absolute',
							transformOrigin: 'center',
							// @ts-ignore // WTF??
							opacity,
							// @ts-ignore // WTF??
							backgroundColor: '#F6E71D',
						}}
					/>
				)})}
			</div>
		</>
	)
}

function useRaf({ callback }) {
	useEffect(() => {
		let rafId = 0
		rafId = window.requestAnimationFrame(onRaf)

		return () => {
			rafId && window.cancelAnimationFrame(rafId)
		}

		function onRaf() {
			callback()
			rafId = window.requestAnimationFrame(onRaf)
		}
	}, [callback])
}
