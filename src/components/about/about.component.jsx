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

		const revealIfInView = () => {
			const rect = node.getBoundingClientRect();
			const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

			if (rect.top <= viewportHeight * 0.92 && rect.bottom >= 0) {
				setIsVisible(true);
				return true;
			}

			return false;
		};

		if (revealIfInView()) {
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
			{ threshold: 0.01, rootMargin: '0px 0px 10% 0px' }
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
