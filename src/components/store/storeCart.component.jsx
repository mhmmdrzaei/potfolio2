import { useContext, useState } from 'react';
import Link from 'next/link';
import { CartContext } from '../../CartContext';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

export default function StoreCart() {
  const cart = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [shippingCountry, setShippingCountry] = useState('US');

  async function handleCheckout() {
    if (!cart.items.length) {
      return;
    }

    setCheckoutError('');
    setIsCheckingOut(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          shippingCountry,
          items: cart.items.map((item) => ({
            id: item._id,
            quantity: item.quantity
          }))
        })
      });

      const payload = await response.json();

      if (!response.ok || !payload.url) {
        throw new Error(payload.error || 'Unable to start checkout.');
      }

      window.location.assign(payload.url);
    } catch (error) {
      setCheckoutError(error.message || 'Unable to start checkout.');
      setIsCheckingOut(false);
    }
  }

  return (
    <>
      <button type="button" className="storeCartToggle" onClick={() => setIsOpen(true)}>
        Cart ({cart.itemCount})
      </button>

      <aside className={`storeCartPanel ${isOpen ? 'is-open' : ''}`}>
        <div className="storeCartHeader">
          <h2>Your Cart</h2>
          <button type="button" className="storeCartClose" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>

        {!cart.items.length ? (
          <div className="storeCartEmpty">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="storeCartItems">
              {cart.items.map((item) => (
                <div className="storeCartItem" key={item._id}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{formatCurrency(item.price)}</p>
                    <Link href={`/store/${item.slug}`}>View item</Link>
                  </div>

                  <div className="storeCartQuantity">
                    <button type="button" onClick={() => cart.setItemQuantity(item._id, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => cart.setItemQuantity(item._id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="storeCartFooter">
              <label className="storeShippingCountry">
                Shipping Country
                <select
                  value={shippingCountry}
                  onChange={(event) => setShippingCountry(event.target.value)}
                  disabled={isCheckingOut}
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                </select>
              </label>
              <p className="storeCartTotal">Total {formatCurrency(cart.getTotalCost())}</p>
              {checkoutError ? <p className="storeCheckoutError">{checkoutError}</p> : null}
              <button type="button" className="storeCheckoutButton" onClick={handleCheckout} disabled={isCheckingOut}>
                {isCheckingOut ? 'Redirecting...' : 'Checkout with Stripe'}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
