import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const IMAGE_SLIDE_DURATION = 2000;
const SLIDER_IMAGE_SIZES = '(max-width: 768px) 100vw, (max-width: 1320px) calc(100vw - 32px), 1320px';

function getDimensions(image, fallbackWidth = 1800, fallbackHeight = 1125) {
  return {
    width: image?.metadata?.dimensions?.width || fallbackWidth,
    height: image?.metadata?.dimensions?.height || fallbackHeight
  };
}

const ProjectMediaSlider = ({ slides = [], projectName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const sliderRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    const node = sliderRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.35, rootMargin: '100px 0px' }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isInViewport) {
      videoRefs.current.forEach((video) => {
        if (!video) {
          return;
        }

        video.pause();
      });
      return undefined;
    }

    if (slides.length <= 1) {
      const singleVideo = slides[0]?.mediaType === 'video' ? videoRefs.current[0] : null;
      if (singleVideo) {
        singleVideo.currentTime = 0;
        const playAttempt = singleVideo.play();
        if (playAttempt?.catch) {
          playAttempt.catch(() => undefined);
        }
      }
      return undefined;
    }

    const activeSlide = slides[activeIndex];
    const activeVideo = activeSlide?.mediaType === 'video' ? videoRefs.current[activeIndex] : null;

    videoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      if (index !== activeIndex) {
        video.pause();
        video.currentTime = 0;
      }
    });

    if (activeVideo) {
      activeVideo.currentTime = 0;
      const handleEnded = () => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
      };

      activeVideo.addEventListener('ended', handleEnded);
      const playAttempt = activeVideo.play();
      if (playAttempt?.catch) {
        playAttempt.catch(() => undefined);
      }

      return () => {
        activeVideo.removeEventListener('ended', handleEnded);
      };
    }

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, IMAGE_SLIDE_DURATION);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, isInViewport, slides]);

  if (!slides.length) {
    return null;
  }

  return (
    <section className="projectMediaSlider" aria-label={`${projectName} media slider`} ref={sliderRef}>
      <div className="projectMediaViewport">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const image = slide.image;
          const dimensions = getDimensions(image);
          const shouldLoadVideo = isInViewport && isActive;

          return (
            <div
              key={slide._key || `${slide.mediaType}-${index}`}
              className={`projectMediaSlide ${isActive ? 'is-active' : ''}`}
              aria-hidden={!isActive}
            >
              {slide.mediaType === 'video' ? (
                <video
                  ref={(node) => {
                    videoRefs.current[index] = node;
                  }}
                  muted
                  playsInline
                  autoPlay={shouldLoadVideo}
                  preload={shouldLoadVideo ? 'metadata' : 'none'}
                  poster={slide.poster?.url || undefined}
                >
                  {shouldLoadVideo ? <source src={slide.video.url} /> : null}
                </video>
              ) : (
                <Image
                  src={image.url}
                  alt={slide.altText || image.alt || `${projectName} media ${index + 1}`}
                  width={dimensions.width}
                  height={dimensions.height}
                  sizes={SLIDER_IMAGE_SIZES}
                  loading="lazy"
                  placeholder={image?.metadata?.lqip ? 'blur' : 'empty'}
                  blurDataURL={image?.metadata?.lqip}
                />
              )}
            </div>
          );
        })}
      </div>

      {slides.length > 1 ? (
        <div className="projectMediaDots" aria-label="Choose project media slide">
          {slides.map((slide, index) => (
            <button
              key={`${slide._key || slide.mediaType}-${index}-dot`}
              type="button"
              className={`projectMediaDot ${index === activeIndex ? 'is-active' : ''}`}
              aria-label={`Go to media ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default ProjectMediaSlider;
