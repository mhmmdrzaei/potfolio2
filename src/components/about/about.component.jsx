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

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio >= 0.18) {
						setIsVisible(true);
						observer.disconnect();
					}
				});
			},
			{ threshold: [0, 0.18, 0.3], rootMargin: '0px 0px -8% 0px' }
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
