import { useEffect, useRef } from 'react';

function lerp(start, end, progress) {
  return Math.round(start + (end - start) * progress);
}

function getSmileyColor(progress) {
  const red = [255, 1, 35];
  const blue = [5, 97, 245];
  const channels = red.map((channel, index) => lerp(channel, blue[index], progress));

  return `rgb(${channels.join(', ')})`;
}

const HeaderInfo = ({ siteHeader }) => {
  const introRef = useRef(null);
  const smileyRef = useRef(null);

  useEffect(() => {
    const introNode = introRef.current;
    const smileyNode = smileyRef.current;
    if (!introNode || !smileyNode) {
      return undefined;
    }

    let rafId = null;

    const updateParallax = () => {
      const scrollY = window.scrollY || 0;
      const viewportWidth = window.innerWidth || 1200;
      const viewportHeight = window.innerHeight || 900;
      const travelDistance = viewportHeight * (viewportWidth < 700 ? 0.55 : 0.85);
      const progress = Math.min(Math.max(scrollY / travelDistance, 0), 1);

      const maxShift = Math.min(viewportWidth * 0.82, 950);
      const shiftX = -(maxShift * progress);
      const opacity = 1 - progress;
      const rotate = scrollY * 0.24;

      introNode.style.setProperty('--intro-shift', `${shiftX}px`);
      introNode.style.setProperty('--intro-opacity', opacity.toFixed(3));
      smileyNode.style.setProperty('--smiley-rotate', `${rotate.toFixed(2)}deg`);
      smileyNode.style.setProperty('--smiley-fill', getSmileyColor(progress));
      rafId = null;
    };

    const onScroll = () => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <div className="introText" ref={introRef}>
        <h1 className="intro">{siteHeader}</h1>
      </div>

      <div className="smileyParent" ref={smileyRef}>
        <svg
          className="smileySVG"
          width="99"
          height="95"
          viewBox="0 0 99 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="smiley artwork"
          role="img"
        >
          <path d="M49.4748 0C22.2432 0 0 21.3377 0 47.4599C0 73.582 22.2436 94.9197 49.4748 94.9197C76.706 94.9197 98.9496 73.5835 98.9496 47.4599C98.9496 21.3363 76.706 0 49.4748 0ZM49.4748 3.98787C74.4197 3.98787 94.7921 23.5298 94.7921 47.4595C94.7921 71.3899 74.4205 90.9312 49.4748 90.9312C24.5292 90.9312 4.15755 71.3892 4.15755 47.4595C4.15755 23.5298 24.5292 3.98787 49.4748 3.98787Z" />
          <path d="M39.0809 33.1021C39.0809 36.4056 36.2882 39.0848 32.8443 39.0848C29.4004 39.0848 26.6076 36.4058 26.6076 33.1021C26.6076 29.7985 29.4003 27.1194 32.8443 27.1194C36.2881 27.1194 39.0809 29.7984 39.0809 33.1021Z" />
          <path d="M71.3019 33.1021C71.3019 36.4056 68.5092 39.0848 65.0652 39.0848C61.6213 39.0848 58.8286 36.4058 58.8286 33.1021C58.8286 29.7985 61.6213 27.1194 65.0652 27.1194C68.5092 27.1194 71.3019 29.7984 71.3019 33.1021Z" />
          <path d="M49.4748 74.9789C62.1553 74.9789 72.3421 65.2074 72.3421 53.043V52.0457H68.1849V53.043C68.1849 63.0136 59.8705 70.9893 49.4767 70.9893C39.0828 70.9893 30.7684 63.0136 30.7684 53.043V52.0457H26.6113V53.043C26.6084 65.0084 36.795 74.9789 49.4756 74.9789H49.4748Z" />
        </svg>
      </div>
    </>
  );
};

export default HeaderInfo;
