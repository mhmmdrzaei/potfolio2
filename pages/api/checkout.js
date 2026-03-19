import Stripe from 'stripe';
import { getStoreProductsByIds } from '../../lib/storeData';

function getBaseUrl(req) {
  return process.env.NEXT_PUBLIC_SITE_URL || `http://${req.headers.host}`;
}

function getCheckoutCurrency() {
  return (process.env.STRIPE_CHECKOUT_CURRENCY || 'usd').toLowerCase();
}

function getAllowedCountries() {
  const rawValue = process.env.STRIPE_ALLOWED_SHIPPING_COUNTRIES || 'US,CA';
  return rawValue
    .split(',')
    .map((country) => country.trim().toUpperCase())
    .filter(Boolean);
}

function getDefaultShippingOptions() {
  const shippingRates = [
    process.env.STRIPE_SHIPPING_RATE_1,
    process.env.STRIPE_SHIPPING_RATE_2,
    process.env.STRIPE_SHIPPING_RATE_3
  ].filter(Boolean);

  return shippingRates.map((shippingRate) => ({
    shipping_rate: shippingRate
  }));
}

function getCountryShippingOptions(country) {
  const normalizedCountry = (country || '').toUpperCase();
  if (!normalizedCountry) {
    return [];
  }

  const shippingRates = [
    process.env[`STRIPE_SHIPPING_RATE_${normalizedCountry}_1`],
    process.env[`STRIPE_SHIPPING_RATE_${normalizedCountry}_2`],
    process.env[`STRIPE_SHIPPING_RATE_${normalizedCountry}_3`]
  ].filter(Boolean);

  return shippingRates.map((shippingRate) => ({
    shipping_rate: shippingRate
  }));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Missing STRIPE_SECRET_KEY.' });
  }

  const requestedCountry = (req.body?.shippingCountry || '').toUpperCase();
  const allowedCountries = getAllowedCountries();
  if (requestedCountry && !allowedCountries.includes(requestedCountry)) {
    return res.status(400).json({ error: 'Unsupported shipping country.' });
  }

  const shippingOptions = requestedCountry
    ? getCountryShippingOptions(requestedCountry)
    : getDefaultShippingOptions();

  if (!shippingOptions.length) {
    return res.status(500).json({
      error: requestedCountry
        ? `Missing Stripe shipping rate configuration for ${requestedCountry}.`
        : 'Missing Stripe shipping rate configuration.'
    });
  }

  const checkoutCurrency = getCheckoutCurrency();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const requestItems = Array.isArray(req.body?.items) ? req.body.items : [];
  const productIds = requestItems.map((item) => item.id).filter(Boolean);

  if (!productIds.length) {
    return res.status(400).json({ error: 'No items provided.' });
  }

  try {
    const products = await getStoreProductsByIds(productIds);
    const productMap = new Map(products.map((product) => [product._id, product]));

    const lineItems = requestItems.map((item) => {
      const product = productMap.get(item.id);

      if (!product) {
        throw new Error(`Product not found for ${item.id}.`);
      }

      if (!product.isAvailable) {
        throw new Error(`${product.title} is not currently available for checkout.`);
      }

      if (product.stripePriceId) {
        return {
          price: product.stripePriceId,
          quantity: item.quantity
        };
      }

      return {
        quantity: item.quantity,
        price_data: {
          currency: checkoutCurrency,
          unit_amount: Math.round(Number(product.price) * 100),
          product_data: {
            name: product.title,
            description: product.shortDescription,
            images: product.primaryImage?.url ? [product.primaryImage.url] : []
          }
        }
      };
    });

    const baseUrl = getBaseUrl(req);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/store`,
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: requestedCountry ? [requestedCountry] : allowedCountries
      },
      shipping_options: shippingOptions
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Unable to create checkout session.' });
  }
}
