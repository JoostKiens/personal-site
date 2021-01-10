import React from 'react'
import './Section.css'

type SectionProps = {
	children: React.ReactNode;
	color: string;
	backgroundColor: string;
}
export function Section({ children, color, backgroundColor }: SectionProps) {
	return (
		<div
			className="Section"
			style={{ color, backgroundColor }}
			{...{ children }}
		/>
	)
}
