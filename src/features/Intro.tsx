import React, { forwardRef, useEffect, useRef } from 'react'
import { ScreenReaderOnly } from './ScreenReaderOnly'
import { useIsInViewport } from '../machinery/useIsInViewport'
import introLandscape from './introLandscape.mp4'
import introPortrait from './introPortrait.mp4'
import { useViewport } from '../machinery/Viewport'
import './Intro.css'

/*
	import { IntroSvg } from './IntroSvg'
  Since this animates blurs, the SVGs are quite heavy. Let's use a screencast instead 🤫
*/
export const Intro = forwardRef<HTMLDivElement, { width: number }>(({ width }, ref) => {
	const { viewportHeight } = useViewport()
	const height = viewportHeight - 80
	const isLandscape = width > height

	return (
		<div {...{ ref }}>
			<ScreenReaderOnly>
				<h1>
					Hey! I&apos;m Joost. UI/UX developer. I focus on UI components,
					interactions, animations, maps, dataviz and other cool stuff
				</h1>
			</ScreenReaderOnly>

			{width && height && (isLandscape ? (
				<VideoLandscape {...{ width, height }} />
			) : (
				<VideoPortrait {...{ width, height }} />
			))}
		</div>
	)
})

type VideoProps = {
	width: number;
	height: number;
}
function VideoPortrait({ width, height }: VideoProps) {
	const intrinsicWidth = 756
	const intrinsicHeight = 1000
	const { isInViewportRef, videoRef } = usePlayVideoInViewport()
	return (
		<div ref={isInViewportRef} className="Intro-video">
			<Video
				ref={videoRef}
				src={introPortrait}
				{...{ width, height, intrinsicWidth, intrinsicHeight }}
			/>
		</div>
	)
}

function VideoLandscape({ width, height }: VideoProps) {
	const intrinsicWidth = 1424
	const intrinsicHeight = 1080
	const { isInViewportRef, videoRef } = usePlayVideoInViewport()
	return (
		<div ref={isInViewportRef} className="Intro-video">
			<Video
				ref={videoRef}
				src={introLandscape}
				{...{ width, height, intrinsicWidth, intrinsicHeight }}
			/>
		</div>
	)
}

type VideoImplProps = {
	src: string;
	width: number;
	height: number;
	intrinsicWidth: number;
	intrinsicHeight: number;
}
const Video = forwardRef<HTMLVideoElement, VideoImplProps>((
	{ src, width, height, intrinsicWidth, intrinsicHeight },
	ref
) => {
	return (
		<video
			aria-hidden
			muted
			disablePictureInPicture
			width={intrinsicWidth}
			height={intrinsicHeight}
			style={
				intrinsicHeight / intrinsicWidth < height / width
				? { width, height: (intrinsicHeight / intrinsicWidth) * width }
				: { width: (intrinsicWidth / intrinsicHeight) * height, height }
			}
			{...{ src, ref }}
		/>
	)
})

function usePlayVideoInViewport() {
	const { ref: isInViewportRef, isInViewport } = useIsInViewport()
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (!videoRef.current) return
		videoRef.current.currentTime = 0
		isInViewport ? videoRef.current.play() : videoRef.current.pause()
	}, [isInViewport])
	return { isInViewportRef, videoRef }
}
