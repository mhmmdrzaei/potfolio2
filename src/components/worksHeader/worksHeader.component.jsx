import { useEffect, useRef, useState } from 'react';

const WorksHeader = ({ works }) => {
  const headerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = headerRef.current;
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
      { threshold: 0.35, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={headerRef} className={`worksHeader ${isVisible ? 'is-visible' : ''}`} id="works">
      <h2>Works</h2>

      <img className="worksSVG" src="/sources/works.svg" alt="works divider" />
      <h3>(a sample)</h3>

      <div className="worksText">{works}</div>
    </div>
  );
};

export default WorksHeader;
