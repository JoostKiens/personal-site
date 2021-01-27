import { useRef, useEffect } from 'react'
import { ViewportContextProvider } from './machinery/Viewport'
import { Section } from './features/Section'
import { Container } from './features/Container'
import { Sparkle } from './features/Sparkle'
import { Marquee } from './features/Marquee'
import { useElementSize } from './machinery/useElementSize'
import { DescriptionContent, DescriptionTitle } from './features/Description'
import { Intro } from './features/Intro'
import './App.css'

export default function App() {
  return (
    <ViewportContextProvider>
      <Page />
    </ViewportContextProvider>
  )
}

function Page() {
	const appRef = useRef<HTMLDivElement>(null)
	const styles = getComputedStyle(document.documentElement)
	const { size: { width: introWidth, height: introHeight },  ref: introRef } = useElementSize()

	useEffect(
		() => {
			const node = appRef.current
			node?.style.setProperty('--introHeight', `${introHeight}px`)
			node?.style.setProperty('--introWidth', `${introWidth}px`)
		},
		[introWidth, introHeight]
	)

	return (
		<div className='App' >
			<div className='App-sparkleWrapper'>
				<div className='App-sparkleOne'>
					<SparkleOne initialDelay={1000} />
				</div>
				<div className='App-sparkleTwo'>
					<SparkleTwo initialDelay={1600} />
				</div>
				<div className='App-sparkleThree'>
					<SparkleThree initialDelay={2000} />
				</div>
			</div>
			<div className='App-content'>
				<Section
					color={styles.getPropertyValue('--yellow-base')}
					backgroundColor={styles.getPropertyValue('--black-base')}
				>
					<Container size='lg'>
						<Intro width={introWidth} ref={introRef} />
					</Container>
				</Section>
				<Section
					color={styles.getPropertyValue('--yellow-base')}
					backgroundColor={styles.getPropertyValue('--black-base')}
				>
					<div className="App-description">
						<Marquee />
						<Container size="md">
							<DescriptionTitle />
						</Container>
						<Container size="md">
							<DescriptionContent />
						</Container>
						<Marquee direction={-1} />
					</div>
				</Section>
			</div>
		</div>
  )
}

function SparkleOne({ initialDelay = 0 }) {
	const sparkles = [
		{ top: '30%', left: '70%', scale: 0.8 },
		{ top: '50%', left: '90%', scale: 1.5 },
		{ top: '60%', left: '50%', scale: 2.4 },
	]
	return <Sparkle {...{ sparkles, initialDelay }} />
}

function SparkleTwo({ initialDelay = 0 }) {
	const sparkles = [
		{ top: '30%', left: '54%', scale: 1 },
		{ top: '50%', left: '37%', scale: 2 },
		{ top: '70%', left: '70%', scale: 3 },
	]
	return <Sparkle {...{ sparkles, initialDelay }} />
}


function SparkleThree({ initialDelay = 0 }) {
	const sparkles = [
		{ top: '30%', left: '70%', scale: 0.8 },
		{ top: '50%', left: '90%', scale: 2 },
		{ top: '80%', left: '60%', scale: 3.4 },
	]
	return <Sparkle {...{ sparkles, initialDelay }} />
}