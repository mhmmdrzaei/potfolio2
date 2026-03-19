import {
  storeProductBySlugQuery,
  storeProductSlugsQuery,
  storeProductsByIdsQuery,
  storeProductsQuery
} from './sanity.queries';
import { sanityClient, hasSanityConfig } from './sanity.client';

function normalizeImage(image) {
  if (!image?.url) {
    return null;
  }

  return image;
}

function normalizeProduct(product) {
  if (!product) {
    return null;
  }

  const primaryImage = normalizeImage(product.primaryImage);
  const gallery = (product.gallery || []).filter((image) => image?.url);

  return {
    ...product,
    primaryImage,
    gallery,
    isAvailable: product.status === 'active'
  };
}

function assertSanityStore() {
  if (!hasSanityConfig || !sanityClient) {
    throw new Error(
      'Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.'
    );
  }
}

export async function getStoreProducts() {
  assertSanityStore();
  const products = await sanityClient.fetch(storeProductsQuery);
  return (products || []).map(normalizeProduct).filter(Boolean);
}

export async function getStoreProductBySlug(slug) {
  assertSanityStore();
  const product = await sanityClient.fetch(storeProductBySlugQuery, { slug });
  return normalizeProduct(product);
}

export async function getStoreProductSlugs() {
  assertSanityStore();
  const slugs = await sanityClient.fetch(storeProductSlugsQuery);
  return (slugs || []).map((entry) => entry.slug).filter(Boolean);
}

export async function getStoreProductsByIds(ids = []) {
  if (!ids.length) {
    return [];
  }

  assertSanityStore();
  const products = await sanityClient.fetch(storeProductsByIdsQuery, { ids });
  return (products || []).map(normalizeProduct).filter(Boolean);
}
