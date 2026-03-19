import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../CartContext';
import StoreMedia from './storeMedia.component';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

export default function StoreProductCard({ product }) {
  const cart = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (!isAdded) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsAdded(false);
    }, 1400);

    return () => window.clearTimeout(timeoutId);
  }, [isAdded]);

  function handleAddToCart() {
    cart.addItem(product);
    setIsAdded(true);
  }

  return (
    <article className="storeCard">
      <Link href={`/store/${product.slug}`} className="storeCardLink">
        <StoreMedia image={product.primaryImage} title={product.title} productType={product.productType} />
      </Link>

      <div className="storeCardBody">
        <div className="storeCardMeta">
          <span className={`storeBadge storeBadge--${product.productType}`}>{product.productType}</span>
          {
            product.status === 'soldOut' ? (
              <span className={`storeStatus storeStatus--${product.status}`}>Sold Out</span>
            ) : product.status === 'comingSoon' ? (
              <span className={`storeStatus storeStatus--${product.status}`}>Coming Soon</span>
            ) : null
          }
        </div>

        <h3 className="storeCardTitle">
          <Link href={`/store/${product.slug}`}>{product.title}</Link>
        </h3>
        <p className="storeCardPrice">{formatCurrency(product.price)}</p>
        <p className="storeCardDescription">{product.shortDescription}</p>

        <div className="storeCardActions">
          <Link href={`/store/${product.slug}`} className="storeAction storeAction--secondary">
            View Item
          </Link>
          <button
            type="button"
            className={`storeAction storeAction--primary ${isAdded ? 'is-added' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
          >
            {product.isAvailable ? (isAdded ? 'Added!' : 'Add to Cart') : product.status === 'soldOut' ? 'Sold Out' : 'Coming Soon'}
          </button>
        </div>
      </div>
    </article>
  );
}
