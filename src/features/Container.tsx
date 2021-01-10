import React from 'react'
import './Container.css'

type ContainerProps = {
  children: React.ReactNode,
  size: 'sm' | 'md' | 'lg'
}
export function Container({ children, size }: ContainerProps) {
	return (
		<div className="Container">
			<div className={`Container-layout Container-layout--${size}`}>
				{children}
			</div>
		</div>
	)
}
