import { useEffect, useRef } from 'react';

const ScrollToTop = (props) => {
  const wrappedRef = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      const scrollY = window.scrollY;
      if (scrollY === 0) {
        window.scrollTo(0, 100);
      } else {
        window.scrollTo(0, 0);
      }
    };

    const wrappedElement = wrappedRef.current;
    if (wrappedElement) {
      wrappedElement.addEventListener('click', handleClick);
    }

    return () => {
      if (wrappedElement) {
        wrappedElement.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return <div ref={wrappedRef}>{props.children}</div>;
};

export default ScrollToTop;
