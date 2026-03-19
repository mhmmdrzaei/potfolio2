import React, { useState, useEffect } from 'react';
import ProductDisplay from '../components/productDisplay/producDisplay.component.jsx'
import CartDisplay from '../components/cartDisplay/cartDisplay.component.jsx';
import PaymentFormComponent from '../components/paymentForm/paymentForm.component.jsx';
import Footer from '../components/footer/footer.component.jsx';

const applicationId = 'sandbox-sq0idb-nI9GquPUde8Yt1eydldnUw'; // Replace with your actual application ID

function StorePage() {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []); // Load cart from localStorage on initial render

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem('cart', JSON.stringify(cartData));
  };

  const handleAddToCart = () => {
    const existingItemIndex = cart.findIndex(item => item.name === 'Sample Product');

    if (existingItemIndex !== -1) {
      // If the product exists, update the quantity and total amount
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      updatedCart[existingItemIndex].totalPrice += updatedCart[existingItemIndex].price * quantity;
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart); // Save updated cart to localStorage
    } else {
      // If the product doesn't exist, add it to the cart
      const newItem = {
        id: 1, // Unique identifier for the product
        name: 'Sample Product', // Product name
        price: 10.00, // Product price
        quantity: quantity, // Quantity of the product
        totalPrice: 10.00 * quantity // Total price for the product
      };
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart); // Save updated cart to localStorage
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  return (
    <div>
      <ProductDisplay
        quantity={quantity}
        handleQuantityChange={handleQuantityChange}
        handleAddToCart={handleAddToCart}
      />

      <CartDisplay cart={cart} />

      <PaymentFormComponent applicationId={applicationId} />

      <Footer />
    </div>
  );
}

export default StorePage;
