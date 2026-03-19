import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import parse from 'html-react-parser';
import { getProjectMedia } from '../../../lib/media';
import { getProjectBackgroundColor, getProjectCategories, slugifyCategory } from '../../../lib/projects';
import LinkButton from '../button/button.component.jsx';
import ProjectMediaSlider from '../projectMediaSlider/projectMediaSlider.component.jsx';

function LazyInlineVideo({ src, poster, caption }) {
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const node = videoWrapperRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
        setIsInViewport(entry.intersectionRatio >= 0.35);
      },
      { threshold: [0, 0.35], rootMargin: '240px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    if (isInViewport) {
      const playAttempt = video.play();
      if (playAttempt?.catch) {
        playAttempt.catch(() => undefined);
      }
      return undefined;
    }

    video.pause();
    return undefined;
  }, [isInViewport]);

  return (
    <div className="video" ref={videoWrapperRef}>
      <video
        ref={videoRef}
        autoPlay={isInViewport}
        loop
        muted
        playsInline
        preload={isNearViewport ? 'metadata' : 'none'}
        poster={poster || undefined}
        controls={false}
      >
        {isNearViewport ? <source src={src} /> : null}
      </video>
      <span>{caption}</span>
    </div>
  );
}

const SingleProject = ({ data, anchorId }) => {
  const projectRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { mediaSlides, projectVideo, projectVideoPoster } = getProjectMedia(data);
  const categories = getProjectCategories(data);
  const projectBackgroundColor = getProjectBackgroundColor(data);

  useEffect(() => {
    const node = projectRef.current;
    if (!node) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px -4% 0px' }
    );

    revealObserver.observe(node);

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return (
    <section
      id={anchorId}
      className={`singleProjectContainer ${isVisible ? 'is-visible' : ''}`}
      ref={projectRef}
      data-project-background={projectBackgroundColor}
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1200px' }}
    >
      <div className="projectDetails">
        <div className="projectDetailsMeta">
          <div>
            <h1>{data.name}</h1>
          </div>

          <div className="projectActions">
            {data.web_adress && <LinkButton data={data.web_adress} type="base" text="See Project!" />}
          </div>
        </div>
      </div>

      <ProjectMediaSlider slides={mediaSlides} projectName={data.name} />

      <div className="projectTypes">
        <h5>{data.job_type}</h5>
        {categories.length ? (
          <div className="projectCategories" aria-label={`${data.name} categories`}>
            {categories.map((category) => (
              <Link
                key={`${data._id || data.id}-${category}`}
                href={`/${slugifyCategory(category)}`}
                className="projectCategoryLink"
              >
                {category}
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      {projectVideo?.url ? (
        <div className="additionalDetails">
          <LazyInlineVideo
            src={projectVideo.url}
            poster={projectVideoPoster?.url}
            caption={data.video_caption}
          />

          <div className="detailsText">{parse(data.description)}</div>
        </div>
      ) : (
        <div className="detailsTextFull">{parse(data.description)}</div>
      )}
    </section>
  );
};

export default SingleProject;
