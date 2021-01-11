import { ViewportContextProvider } from './machinery/Viewport'
import { Section } from './features/Section'
import { Container } from './features/Container'
import { Sparkle } from './features/Sparkle'
import { Marquee } from './features/Marquee'
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
	const styles = getComputedStyle(document.documentElement)

	return (
		<div className='App'>
			<div className='App-content'>
				<Section
					color={styles.getPropertyValue('--yellow-base')}
					backgroundColor={styles.getPropertyValue('--black-base')}
				>
					<Container size='lg'>
						<Intro />
					</Container>
				</Section>
				<Section
					color={styles.getPropertyValue('--yellow-base')}
					backgroundColor={styles.getPropertyValue('--black-base')}
				>
					<Marquee />
					<Container size="md">
						<DescriptionTitle />
					</Container>
					<Container size="md">
						<DescriptionContent />
					</Container>
					<Marquee direction={-1} />
				</Section>
			</div>
			<div className='App-sparkleWrapper'>
				<div className='App-sparkleBottomLeft'>
					<SparkleBottomLeft initialDelay={2000} />
				</div>
				<div className='App-sparkleTopLeft'>
					<SparkleTopLeft initialDelay={1000} />
				</div>
				<div className='App-sparkleTopRight'>
					<SparkleTopRight initialDelay={1600} />
				</div>
			</div>
		</div>
  )
}

function SparkleBottomLeft({ initialDelay = 0 }) {
	const sparkles = [
		{ top: '30%', left: '54%', fontSize: 50 },
		{ top: '50%', left: '37%', fontSize: 80 },
		{ top: '70%', left: '70%', fontSize: 140 },
	]
	return <Sparkle {...{ sparkles, initialDelay }} />
}

function SparkleTopLeft({ initialDelay = 0 }) {
	const sparkles = [
		{ top: '30%', left: '70%', fontSize: 20 },
		{ top: '50%', left: '90%', fontSize: 30 },
		{ top: '60%', left: '70%', fontSize: 60 },
	]
	return <Sparkle {...{ sparkles, initialDelay }} />
}

function SparkleTopRight({ initialDelay = 0 }) {
	const sparkles = [
		{ top: '30%', left: '70%', fontSize: 20 },
		{ top: '50%', left: '90%', fontSize: 60 },
		{ top: '100%', left: '60%', fontSize: 100 },
	]
	return <Sparkle {...{ sparkles, initialDelay }} />
}