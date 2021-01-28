import React from 'react'
import { animated, useSpring, config } from 'react-spring'
import { useElementSize } from '../machinery/useElementSize'
import { useHover } from 'react-use-gesture'
import './Link.css'

export function Link({ children, href }: { children: React.ReactNode; href: string; }) {
	const {
		ref,
		size: { width },
	} = useElementSize()

	const [{ x }, set] = useSpring(() => ({
		x: 0,
		config: config.stiff,
	}))

	const bind = useHover(({ hovering }) => {
		set({ x: hovering ? -60 : 0 })
	})

	return (
		<a className="Link" {...bind()} {...{ href, ref }}>
			<span className="Link-children">{children}</span>
			<animated.svg
				viewBox={`0 0 ${width} 4`}
				className="Link-underline"
				strokeDasharray={6}
				strokeDashoffset={x}
				style={{ width }}
			>
				<line
					x1="0"
					y1="2"
					x2={width}
					y2="2"
					strokeWidth={4}
					stroke="currentColor"
				/>
			</animated.svg>
		</a>
	)
}

export function LinkIcon({ href, Icon, title }: { href: string; Icon: React.ComponentType; title: string }) {
	const [style, setSpring] = useSpring(() => ({
		transform: `scale(1)`,
		config: config.stiff,
	}))

	const bind = useHover(({ hovering }) => {
		setSpring({ transform: `scale(${hovering ? 2 : 1})` })
	})

	return (
		<animated.a className="LinkIcon" {...bind()} {...{ href, title, style }}>
			<Icon />
		</animated.a>
	)
}
