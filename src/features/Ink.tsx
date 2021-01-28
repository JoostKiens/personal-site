// Inspired by https://cdn.jsdelivr.net/gh/niccolomiranda/m-m@f18803d/ink-minify.js
import React, { useCallback, useRef, useEffect, useState, useMemo } from 'react'
import { useUniqueId } from '../machinery/useUniqueId'
import { useMove } from 'react-use-gesture'
import { animated, useSprings } from 'react-spring'

const amount = 20
const sineDots = Math.floor(0.3 * amount)
const width = 40
const idleTimeout = 150
const angleSpeed = 0.5
const trailAmount = 0.35

export function Ink() {
	const { isIdle, startIdleTimer, resetIdleTimer } = useIdleTimer(idleTimeout)
	const mousePositionRef = useRef([0, 0])
	const id = useUniqueId()
	const isGecko = useMemo(() => {
		const regex1 = /Gecko\/\d+/g
		const regex2 = /rv\:\d+/g
		const ua = window.navigator.userAgent
		return ua.match(regex1) && ua.match(regex2)
	}, [])

	const [springs, setSprings] = useSprings(20, (index) => {
		const scale = 1 - 0.05 * index
		return {
			xy: [0, 0],
			scale,
			angle: [0, 0],
			range: width / 2 - (width / 2) * scale + 2,
		}
	})

	useMove(
		({ values: [x, y], moving }) => {
			mousePositionRef.current = [x, y]
			moving ? resetIdleTimer() : startIdleTimer()
		},
		{ domTarget: window }
	)

	useEffect(() => {
		if (!isIdle) return
		setSprings(() => ({
			angle: [2 * Math.PI * Math.random(), 2 * Math.PI * Math.random()],
		}))
	}, [isIdle, setSprings])

	const draw = useCallback(() => {
		let x = mousePositionRef.current[0]
		let y = mousePositionRef.current[1]

		setSprings((index, controller) => {
			var next = springs[index + 1] || springs[0]
			const [nextX, nextY] = next.xy.get()
			const [resX, resY] = [x, y]
			x += (nextX - resX) * trailAmount
			y += (nextY - resY) * trailAmount

			if (!isIdle || index <= sineDots) {
				return {
					xy: [resX, resY],
					immediate: true,
				}
			} else {
				const angle = controller.springs.angle.get()
				const range = controller.springs.range.get()
				const newAngle = angle.map((x) => x + angleSpeed * Math.random())
				const newX = x + Math.sin(newAngle[0]) * range
				const newY = y + Math.cos(newAngle[1]) * range

				return {
					xy: [newX, newY],
					angle: newAngle,
				}
			}
		})
	}, [setSprings, springs, isIdle])

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
				{springs.map(({ xy, scale }, i) => {
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

function useIdleTimer(idleTimeout) {
	const [isIdle, setIsIdle] = useState(false)
	const timerIdRef = useRef<any>()

	function goIdle() {
		setIsIdle(true)
	}

	function startIdleTimer() {
		timerIdRef.current = setTimeout(goIdle, idleTimeout)
		setIsIdle(false)
	}

	function resetIdleTimer() {
		clearTimeout(timerIdRef.current)
		startIdleTimer()
	}

	useEffect(() => {
		return () => {
			timerIdRef.current && clearTimeout(timerIdRef.current)
		}
	}, [])

	return { resetIdleTimer, startIdleTimer, isIdle }
}
