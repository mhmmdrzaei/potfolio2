import Link from 'next/link';
import { useContext } from 'react';
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
            className="storeAction storeAction--primary"
            onClick={() => cart.addItem(product)}
            disabled={!product.isAvailable}
          >
            {product.isAvailable ? 'Add to Cart' : product.status === 'soldOut' ? 'Sold Out' : 'Coming Soon'}
          </button>
        </div>
      </div>
    </article>
  );
}
