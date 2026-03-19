import React, {useState} from 'react';
import Cart from '../cart/cart.component'
import PropTypes from 'prop-types';


const CartNav = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
    const [isCartVisible, setCartVisible] = useState(false);

    return (
        <div className="nav">
            <div className="nav__cart" onClick={() => setCartVisible(!isCartVisible)}>
                {!isCartVisible ? (
                <button className="nav__cart-open">
                    
                    {cart !== null ? <span>{cart.total_items}</span> : ''}
                    
                </button>
                ) : (
                    <button className="nav__cart-close">
                
                    </button>
                )}
            </div>
            {isCartVisible &&
                <Cart
                    cart={cart}
                    onUpdateCartQty={onUpdateCartQty}
                    onRemoveFromCart={onRemoveFromCart}
                    onEmptyCart={onEmptyCart}
                />
            }  
        </div>
    )
}

export default CartNav;

CartNav.propTypes = {
    cart: PropTypes.object,
    onUpdateCartQty: PropTypes.func,
    onRemoveFromCart: PropTypes.func,
    onEmptyCart: PropTypes.func,
};