import React from 'react';

const CartDisplay = ({ cart }) => {
  return (
    <div>
      <h2>Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Total Price: ${item.totalPrice.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export default CartDisplay;
