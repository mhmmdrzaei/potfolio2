function normalizeImage(image, fallbackAlt) {
  if (!image?.url) {
    return null;
  }

  return {
    ...image,
    alt: image.alt || fallbackAlt
  };
}

function normalizeVideo(video) {
  if (!video?.url) {
    return null;
  }

  return {
    ...video
  };
}

export function getProjectMedia(project) {
  const webImage = normalizeImage(project.webImage, `${project.name} website documentation`);
  const projectVideo = normalizeVideo(project.projectVideo);
  const projectVideoPoster = normalizeImage(
    project.projectVideoPoster,
    project.video_caption || `${project.name} video poster`
  );

  const mediaSlides = Array.isArray(project.mediaSlides)
    ? project.mediaSlides
        .map((slide, index) => {
          if (slide?.mediaType === 'video') {
            const video = normalizeVideo(slide.video);
            if (!video) {
              return null;
            }

            return {
              _key: slide._key || `slide-video-${index}`,
              mediaType: 'video',
              altText: slide.altText || `${project.name} documentation video ${index + 1}`,
              video,
              poster: normalizeImage(slide.videoPoster, `${project.name} video poster ${index + 1}`)
            };
          }

          const image = normalizeImage(
            slide?.image,
            slide?.altText || `${project.name} documentation image ${index + 1}`
          );

          if (!image) {
            return null;
          }

          return {
            _key: slide._key || `slide-image-${index}`,
            mediaType: 'image',
            altText: slide.altText || image.alt,
            image
          };
        })
        .filter(Boolean)
    : [];

  return {
    mediaSlides: mediaSlides.length ? mediaSlides : webImage ? [{
      _key: 'web-image',
      mediaType: 'image',
      altText: webImage.alt,
      image: webImage
    }] : [],
    projectVideo,
    projectVideoPoster
  };
}
