import { useContext, useEffect, useMemo, useState } from 'react';
import parse from 'html-react-parser';
import { CartContext } from '../../CartContext';
import StoreMedia from './storeMedia.component';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

export default function StoreProductDetail({ product }) {
  const cart = useContext(CartContext);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const lightboxImages = useMemo(() => {
    const seen = new Set();

    return (product.gallery || []).filter((image) => {
      if (!image?.url || seen.has(image.url)) {
        return false;
      }

      seen.add(image.url);
      return true;
    });
  }, [product.gallery]);

  const isLightboxOpen = lightboxIndex !== null;
  const currentImage = isLightboxOpen ? lightboxImages[lightboxIndex] : null;

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function openLightbox(index) {
    setLightboxIndex(index);
  }

  function showPrev() {
    setLightboxIndex((current) => {
      if (current === null) {
        return current;
      }

      return (current - 1 + lightboxImages.length) % lightboxImages.length;
    });
  }

  function showNext() {
    setLightboxIndex((current) => {
      if (current === null) {
        return current;
      }

      return (current + 1) % lightboxImages.length;
    });
  }

  function handleAddToCart() {
    cart.addItem(product);
    setIsAdded(true);
  }

  useEffect(() => {
    if (!isLightboxOpen) {
      return undefined;
    }

    function handleKeydown(event) {
      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowLeft') {
        showPrev();
      }

      if (event.key === 'ArrowRight') {
        showNext();
      }
    }

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [isLightboxOpen, lightboxImages.length]);

  useEffect(() => {
    if (!isAdded) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsAdded(false);
    }, 1400);

    return () => window.clearTimeout(timeoutId);
  }, [isAdded]);

  return (
    <article className="storeDetail">
      <div className="storeDetailMedia">
        {product.primaryImage ? (
          <div className="storeMainMediaButton">
            <StoreMedia
              image={product.primaryImage}
              title={product.title}
              productType={product.productType}
              priority
              sizes="(max-width: 900px) 90vw, 48vw"
            />
          </div>
        ) : null}

        {lightboxImages.length ? (
          <div className="storeGallery">
            {lightboxImages.map((image, index) => (
              <button
                type="button"
                className="storeGalleryItemButton"
                key={`${product._id}-gallery-${index}`}
                onClick={() => openLightbox(index)}
                aria-label={`Open gallery image ${index + 1} for ${product.title}`}
              >
                <div className="storeGalleryItem">
                  <StoreMedia
                    image={image}
                    title={`${product.title} gallery image ${index + 1}`}
                    productType="object"
                    sizes="(max-width: 900px) 40vw, 16vw"
                  />
                </div>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="storeDetailBody">
        <div className="storeCardMeta">
          <span className={`storeBadge storeBadge--${product.productType}`}>{product.productType}</span>
          {product.status === 'soldOut' ? (
            <span className={`storeStatus storeStatus--${product.status}`}>Sold Out</span>
          ) : product.status === 'comingSoon' ? (
            <span className={`storeStatus storeStatus--${product.status}`}>Coming Soon</span>
          ) : null}
        </div>

        <h1>{product.title}</h1>
        <p className="storeDetailPrice">{formatCurrency(product.price)}</p>
        <div className="storeDetailActions">
          <button
            type="button"
            className={`storeAction storeAction--primary ${isAdded ? 'is-added' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
          >
            {product.isAvailable ? (isAdded ? 'Added!' : 'Add to Cart') : product.status === 'soldOut' ? 'Sold Out' : 'Coming Soon'}
          </button>
        </div>

        <div className="storeDetailDescription">{parse(product.description)}</div>
      </div>

      {isLightboxOpen && currentImage ? (
        <div className="storeLightbox" role="dialog" aria-modal="true" aria-label={`${product.title} gallery`}>
          <button
            type="button"
            className="storeLightboxBackdrop"
            onClick={closeLightbox}
            aria-label="Close image lightbox"
          />
          <div className="storeLightboxInner">
            <button type="button" className="storeLightboxClose" onClick={closeLightbox} aria-label="Close">
              Close
            </button>
            <button type="button" className="storeLightboxNav storeLightboxNav--prev" onClick={showPrev}>
              ←
            </button>
            <div className="storeLightboxMedia">
              <StoreMedia image={currentImage} title={product.title} productType="object" sizes="90vw" />
            </div>
            <button type="button" className="storeLightboxNav storeLightboxNav--next" onClick={showNext}>
              →
            </button>
            <p className="storeLightboxCount">
              {lightboxIndex + 1} / {lightboxImages.length}
            </p>
          </div>
        </div>
      ) : null}
    </article>
  );
}
