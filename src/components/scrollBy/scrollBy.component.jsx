import { useEffect, useRef } from 'react';

const ScrollBy = (props) => {
  const wrappedRef = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      window.scrollBy(0, -200);
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

export default ScrollBy;
