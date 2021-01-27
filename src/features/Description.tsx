import React from 'react'
import { Link, LinkIcon } from './Link'
import { useScroll } from 'react-use-gesture'
import { animated, useSpring } from 'react-spring'
import './Description.css'

export function DescriptionContent() {
	return (
		<div className="DescriptionContent">
			<p>
				I mostly work on content platforms, component libraries, experience
				websites &amp; campaigns. The sharpest gear in my toolbox is ReactJS,
				CSS, JS, SVG, react-spring, pixi.js, react-three-fiber, gsap, mapbox and
				couple other little doodads, bits and bobs.
			</p>

			<p>
				Previously senior front-end developer at{' '}
				<Link href="https://kaliber.net">Kaliber</Link>. Over the years
				I&apos;ve worked for{' '}
				<Link href="https://www.werf-en.nl/waarom-is-recruitmentsite-bol-com-zo-goed/">
					bol.com
				</Link>
				, <Link href="https://vimeo.com/207112331">KLM</Link>,{' '}
				<Link href="https://rabobank.jobs">Rabobank</Link>, Rijksoverheid,{' '}
				<Link href="https://www.fairtradeoriginal.nl/">Fairtrade Original</Link>
				,{' '}
				<Link href="https://www.oidji.nl/nieuws/nieuwsberichten-2019/interactieve-tafel-als-innovatieve-leervorm.aspx">
					DJI
				</Link>
				, VELUX, Nespresso, the government of Zimbabwe, T-Mobile and many more.
			</p>

			<p>
				Available for freelance work starting from the middle of april 2021! ☺
			</p>

			<p>Want to know more? Reach me at:</p>
			<div className="DescriptionContent-socials">
				<LinkIcon
					href="mailto:dev@joostkiens.com"
					Icon={IconMail}
					title="Email"
				/>
				<LinkIcon
					href="https://www.instagram.com/joostkiens/"
					Icon={IconInstagram}
					title="Instagram"
				/>
				<LinkIcon
					href="https://github.com/JoostKiens"
					Icon={IconGithub}
					title="Github"
				/>
				<LinkIcon
					href="https://www.linkedin.com/in/joostkiens/"
					Icon={IconLinkedIn}
					title="LinkedIn"
				/>
				<LinkIcon
					href="https://twitter.com/joostkiens"
					Icon={IconTwitter}
					title="Twitter"
				/>
			</div>
		</div>
	)
}

export function DescriptionTitle() {
	const [{ r }, set] = useSpring(() => ({ r: 0, immediate: true }))
	useScroll(
		({ offset: [, y] }) => {
			set({ r: y * 0.06 })
		},
		{ domTarget: window }
	)

	return (
		<div className="DescriptionTitle">
			<animated.div
				style={{
					willChange: 'transform',
					transform: r.interpolate((v) => `rotate(${v}deg)`),
				}}
				className="DescriptionTitle-decoration"
			>
				⭑
			</animated.div>
			<h2 className="DescriptionTitle-title">
				building artisanal
				<br />
				web experiences since 2008
			</h2>
			<animated.div
				style={{
					willChange: 'transform',
					transform: r.interpolate((v) => `rotate(${v}deg)`),
				}}
				className="DescriptionTitle-decoration"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="34" height="32" viewBox="0 0 34 32">
  				<polygon fill="currentColor" points="26.944 31.44 23.392 19.68 33.232 12.096 21.088 12.096 17.056 .288 13.024 12.096 .88 12.096 10.72 19.68 7.168 31.44 17.056 24.432"/>
				</svg>
			</animated.div>
		</div>
	)
}

function IconMail() {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			role="img"
			viewBox="0 0 512 512"
			width="512"
			height="512"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill="currentColor"
				d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"
			/>
		</svg>
	)
}

function IconInstagram() {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			role="img"
			viewBox="0 0 448 512"
			width="448"
			height="512"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill="currentColor"
				d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
			/>
		</svg>
	)
}

function IconTwitter() {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			role="img"
			viewBox="0 0 512 512"
			width="512"
			height="512"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill="currentColor"
				d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
			/>
		</svg>
	)
}

function IconGithub() {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			role="img"
			viewBox="0 0 480 512"
			width="480"
			height="512"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill="currentColor"
				d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z"
				className=""
			></path>
		</svg>
	)
}

function IconLinkedIn() {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			role="img"
			viewBox="0 0 448 512"
			width="448"
			height="512"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill="currentColor"
				d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 01107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
			/>
		</svg>
	)
}
