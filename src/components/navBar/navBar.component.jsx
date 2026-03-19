import {Button} from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CartContext } from "../../CartContext";
import CartProduct from '../cartProduct/cartProduct.component';

function NavbarComponent() {
    const cart = useContext(CartContext);


    const redirectToStripeCheckout = () => {
        window.location.href = 'https://buy.stripe.com/4gw01g8wka4Xeek6op';
      };

    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);
    const [modalOpen, setModalOpen] = useState(false);
    const handleToggle = () => {
        setModalOpen(!modalOpen)
    }

    return (
        <>
         <button onClick={handleToggle} className="cartbutton">Cart({productsCount})</button>
         <section className={`modal-window ${modalOpen ? " showModal" : ""}`}>
         <button onClick={handleToggle} className="cartbuttonClose">Close</button>

           
            
                                {productsCount > 0 ?
                        <>
                            <p>Items in your cart:</p>
                            {cart.items.map( (currentProduct, idx) => (
                                <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                            ))}

                            <h3>Total: {cart.getTotalCost().toFixed(2)}</h3>

                            <Button variant="success" onClick={redirectToStripeCheckout}>
                                Checkout
                            </Button>
                        </>
                    :
                        <h2 className='cart-empty'>There are no items in your cart!</h2>
                    }

            
         </section>

            {/* <Navbar expand="sm">
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
            </Modal> */}
        </>
    )
}

export default NavbarComponent;