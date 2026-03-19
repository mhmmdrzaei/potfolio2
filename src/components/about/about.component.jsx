// import ReactHtmlParser from 'react-html-parser'; 
import { useEffect, useRef, useState } from 'react';
import parse from 'html-react-parser';
const About =({about})=> {
	const aboutRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const node = aboutRef.current;
		if (!node) {
			return undefined;
		}

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) {
			setIsVisible(true);
			return undefined;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true);
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.2, rootMargin: '0px 0px -5% 0px' }
		);

		observer.observe(node);

		return () => observer.disconnect();
	}, []);

	return (
		<div className={`aboutText ${isVisible ? 'is-visible' : ''}`} id="about" ref={aboutRef}>
		{ parse (about) }
		</div>
		) 
}
export default About
