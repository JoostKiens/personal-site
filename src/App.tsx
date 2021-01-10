import { ViewportContextProvider } from './machinery/Viewport'
import { Section } from './features/Section'
import { Container } from './features/Container'
import { Sparkle } from './features/Sparkle'
import { Marquee } from './features/Marquee'
import { DescriptionContent, DescriptionTitle } from './features/Description'
import { Intro } from './features/Intro'

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
		<>
    <Section
      color={styles.getPropertyValue('--yellow-base')}
			backgroundColor={styles.getPropertyValue('--black-base')}
    >
      <Container size='lg'>
        <div style={{ position: 'relative', overflow: 'visible' }}>
          <Intro />

					<div
							style={{
								position: 'absolute',
								bottom: '-16%',
								left: '25%',
							}}
						>
							<SparkleBottomLeft initialDelay={2000} />
						</div>
						<div
							style={{
								position: 'absolute',
								top: '-8%',
								left: '2%',
							}}
						>
							<SparkleTopLeft initialDelay={1000} />
						</div>
						<div
							style={{
								position: 'absolute',
								top: '2%',
								right: '2%',
							}}
						>
							<SparkleTopRight initialDelay={1600} />
						</div>
        </div>
      </Container>
    </Section>
		<Section
				color={styles.getPropertyValue('--yellow-base')}
				backgroundColor={styles.getPropertyValue('--black-base')}
			>
				<div
					style={{
						transform: `translate(0%, -50%)`,
					}}
				>
					<Marquee />
				</div>
				<Container size="md">
					<DescriptionTitle />
				</Container>
				<Container size="md">
					<DescriptionContent />
				</Container>
				<div
					style={{
						transform: `translate(0%, 50%)`,
					}}
				>
					<Marquee direction={-1} />
				</div>
			</Section>
		</>
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