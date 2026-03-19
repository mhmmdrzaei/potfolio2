import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { CartContext } from '../../CartContext';
import { useContext } from 'react';
import parse from 'html-react-parser';
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";

function ProductCard(props) { // props.product is the product we are selling
    const product = props.product;
    const cart = useContext(CartContext);
    const productQuantity = cart.getProductQuantity(product.id);
    console.log(cart.items);

    const cld = new Cloudinary({
        cloud: {
        cloudName: 'in-search-of'
        }
        });
    
    const getCloudinaryImage = (imageUrl) => cld.image(imageUrl).resize(fill().width(700));
    const mainImg = getCloudinaryImage(`${product.img}`);
    return (
        <section className="product">
            <section className="productImages">
            <article className="media-container">
                <div className="book-wrapper">
                <div className="book">
                <div className="book__front">
               <AdvancedImage cldImg={mainImg} alt='printed publication '/>
                </div>
                <div className="book__paper"></div>
                <div className="book__back"></div>
                </div>
                <div className="book-shadow"></div>
                </div>
                </article>
            

            </section>
            <section className="productInfo">
            <h1>{product.title}</h1>
            <h3>${product.price}</h3>
            { productQuantity > 0 ?
                    <>
                    
                        <Form as={Row}>
                            <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
                            <Col sm="6">
                                <Button sm="6" onClick={() => cart.addOneToCart(product.id)} className="mx-2">+</Button>
                                <Button sm="6" onClick={() => cart.removeOneFromCart(product.id)} className="mx-2">-</Button>
                            </Col>
                        </Form>
                        <Button variant="danger" onClick={() => cart.deleteFromCart(product.id)} className="my-2">Remove from cart</Button>
                    </>
                    :
                    <Button variant="primary" onClick={() => cart.addOneToCart(product.id)}>Add To Cart</Button>
                }
            <section className="description">
            { parse (product.description)}
            </section>
            


            </section>
        </section>

    )
}

export default ProductCard;