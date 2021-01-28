import React from 'react'
import './Section.css'
import { useViewport } from '../machinery/Viewport'

type SectionProps = {
	children: React.ReactNode;
	color: string;
	backgroundColor: string;
}
export function Section({ children, color, backgroundColor }: SectionProps) {
	const { viewportHeight } = useViewport()
	return (
		<div
			className="Section"
			style={{ color, backgroundColor, minHeight: viewportHeight }}
			{...{ children }}
		/>
	)
}
