
import PropTypes from 'prop-types';
import commerce  from '../lib/commerce';
import React, { useState, useEffect } from 'react';


const Checkout = ({ cart, history, onCaptureCheckout }) => {
    const [checkoutToken, setCheckoutToken] = useState({});
    const [formData, setFormData] = useState({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@email.com',
        shippingName: 'Jane Doe',
        shippingStreet: '123 Fake St',
        shippingCity: '',
        shippingStateProvince: '',
        shippingPostalZipCode: '',
        shippingCountry: '',
        cardNum: '4242 4242 4242 4242',
        expMonth: '11',
        expYear: '2023',
        ccv: '123',
    });
    const [shippingCountries, setShippingCountries] = useState({});
    const [shippingSubdivisions, setShippingSubdivisions] = useState({});
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    useEffect(() => {
        generateCheckoutToken();
    }, []);

    useEffect(() => {
        if (formData.shippingCountry) {
            fetchSubdivisions(formData.shippingCountry);
        }
    }, [formData.shippingCountry]);

    useEffect(() => {
        if (checkoutToken.id && formData.shippingCountry) {
            fetchShippingOptions(checkoutToken.id, formData.shippingCountry, formData.shippingStateProvince);
        }
    }, [checkoutToken.id, formData.shippingCountry, formData.shippingStateProvince]);

    const generateCheckoutToken = async () => {
        if (cart.line_items.length) {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                setCheckoutToken(token);
                fetchShippingCountries(token.id);
            } catch (error) {
                console.log('There was an error in generating a token', error);
            }
        }
    };

    const fetchShippingCountries = async (checkoutTokenId) => {
        try {
            const countries = await commerce.services.localeListShippingCountries(checkoutTokenId);
            setShippingCountries(countries.countries);
        } catch (error) {
            console.log('There was an error fetching a list of shipping countries', error);
        }
    };

    const fetchSubdivisions = async (countryCode) => {
        try {
            const subdivisions = await commerce.services.localeListSubdivisions(countryCode);
            setShippingSubdivisions(subdivisions.subdivisions);
        } catch (error) {
            console.log('There was an error fetching the subdivisions', error);
        }
    };

    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        try {
            const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
            setShippingOptions(options);
            // Pre-select the first available method
            if (options.length > 0) {
                setShippingOption(options[0]);
            }
        } catch (error) {
            console.log('There was an error fetching the shipping methods', error);
        }
    };

    const handleFormChanges = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleShippingCountryChange = (e) => {
        const currentValue = e.target.value;
        setFormData({
            ...formData,
            shippingCountry: currentValue,
        });
    };

    const handleSubdivisionChange = (e) => {
        const currentValue = e.target.value;
        setFormData({
            ...formData,
            shippingStateProvince: currentValue,
        });
    };

    const handleCaptureCheckout = (e) => {
        e.preventDefault();
        const orderData = {
            line_items: sanitizedLineItems(cart.line_items),
            customer: {
                firstname: formData.firstName,
                lastname: formData.lastName,
                email: formData.email,
            },
            shipping: {
                name: formData.shippingName,
                street: formData.shippingStreet,
                town_city: formData.shippingCity,
                county_state: formData.shippingStateProvince,
                postal_zip_code: formData.shippingPostalZipCode,
                country: formData.shippingCountry,
            },
            fulfillment: {
                shipping_method: shippingOption.id,
            },
            payment: {
                gateway: 'test_gateway',
                card: {
                    number: formData.cardNum,
                    expiry_month: formData.expMonth,
                    expiry_year: formData.expYear,
                    cvc: formData.ccv,
                    postal_zip_code: formData.shippingPostalZipCode,
                },
            },
        };
        onCaptureCheckout(checkoutToken.id, orderData);
        history.push('/confirmation');
    };

    const sanitizedLineItems = (lineItems) => {
        return lineItems.reduce((data, lineItem) => {
            const item = data;
            let variantData = null;
            if (lineItem.selected_options.length) {
                variantData = {
                    [lineItem.selected_options[0].group_id]: lineItem.selected_options[0].option_id,
                };
            }
            item[lineItem.id] = {
                quantity: lineItem.quantity,
                variants: variantData,
            };
            return item;
        }, {});
    };

    const renderCheckoutForm = () => {
        return (
            <form className="checkout__form" onChange={handleFormChanges}>
                {/* Form fields */}
            </form>
        );
    };

    const renderCheckoutSummary = () => {
        return (
            <div className="checkout__summary">
                {/* Checkout summary */}
            </div>
        );
    };

    return (
        <div className="checkout">
            <h2 className="checkout__heading">Checkout</h2>
            <div className="checkout__wrapper">
                {renderCheckoutForm()}
                {renderCheckoutSummary()}
            </div>
        </div>
    );
};

export default Checkout;

Checkout.propTypes = {
    cart: PropTypes.object,
    history: PropTypes.object,
    onCaptureCheckout: PropTypes.func,
};
