import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDisplay = ({ handleAddToCart }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get('https://connect.squareup.com/v2/catalog/list', {
        headers: {
          'Authorization': 'Bearer EAAAl0CcbFjDdE9OlPVcTsNsiMeGsYfE9QnaBaMenNOHT86YC8XM8bg5qUKay6n4',
          'Square-Version': '2024-03-20',
          'Content-Type': 'application/json'
        }
      });
      // Assuming the first product in the response is the desired product
      const firstProduct = response.data.objects[0];
      setProduct(firstProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  return (
    <div>
      {product ? (
        <>
          <h2>{product.category_data.name}</h2>
          <p>{product.category_data.description}</p>
          <img src={product.image_url} alt={product.category_data.name} />
          <p>${product.category_data.price.toFixed(2)}</p>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </>
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
};

export default ProductDisplay;
