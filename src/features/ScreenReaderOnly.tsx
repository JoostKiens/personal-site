import React from 'react'
import './ScreenReaderOnly.css'

export function ScreenReaderOnly({ children }: { children: React.ReactNode}) {
	return <div className="ScreenReaderOnly">{children}</div>
}
