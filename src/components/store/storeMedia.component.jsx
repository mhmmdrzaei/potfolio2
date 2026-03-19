import Image from 'next/image';

function getDimensions(image, fallbackWidth, fallbackHeight) {
  return {
    width: image?.metadata?.dimensions?.width || fallbackWidth,
    height: image?.metadata?.dimensions?.height || fallbackHeight
  };
}

export default function StoreMedia({
  image,
  title,
  productType,
  priority = false,
  sizes = '(max-width: 700px) 90vw, 30vw'
}) {
  if (!image?.url) {
    return null;
  }

  const { width, height } = getDimensions(image, 1200, 1500);
  const imageNode = (
    <Image
      src={image.url}
      alt={image.alt || `${title} product image`}
      width={width}
      height={height}
      sizes={sizes}
      placeholder={image?.metadata?.lqip ? 'blur' : 'empty'}
      blurDataURL={image?.metadata?.lqip}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
    />
  );

  if (productType === 'book') {
    return (
      <article className="media-container storeBookMedia">
        <div className="book-wrapper">
          <div className="book">
            <div className="book__front">{imageNode}</div>
            <div className="book__paper" />
            <div className="book__back" />
          </div>
          <div className="book-shadow" />
        </div>
      </article>
    );
  }

  return <div className="storeObjectMedia">{imageNode}</div>;
}
