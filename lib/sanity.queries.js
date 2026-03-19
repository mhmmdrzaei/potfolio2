import groq from 'groq';

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  site_header,
  about_text,
  works_header,
  email_address,
  seo{
    metaTitle,
    metaDescription,
    siteName,
    canonicalBaseUrl,
    twitterCard,
    twitterHandle,
    robotsNoIndex,
    openGraphImage{
      alt,
      "url": asset->url
    }
  },
  contact[]{
    _key,
    title,
    url
  }
}`;

export const projectsQuery = groq`*[_type == "project"] | order(order asc, _createdAt asc){
  _id,
  order,
  name,
  job_type,
  categories,
  backgroundColor,
  mediaSlides[]{
    _key,
    mediaType,
    altText,
    image{
      alt,
      "url": asset->url,
      "metadata": asset->metadata{
        lqip,
        dimensions
      }
    },
    video{
      "url": asset->url,
      "originalFilename": asset->originalFilename
    },
    videoPoster{
      alt,
      "url": asset->url,
      "metadata": asset->metadata{
        lqip,
        dimensions
      }
    }
  },
  webImage{
    alt,
    "url": asset->url,
    "metadata": asset->metadata{
      lqip,
      dimensions
    }
  },
  projectVideo{
    "url": asset->url,
    "originalFilename": asset->originalFilename
  },
  projectVideoPoster{
    alt,
    "url": asset->url,
    "metadata": asset->metadata{
      lqip,
      dimensions
    }
  },
  video_caption,
  web_adress,
  description
}`;

export const musicVideosQuery = groq`*[_type == "musicVideo"] | order(order asc, _createdAt asc){
  _id,
  order,
  embed_link
}`;

export const storeProductsQuery = groq`*[_type == "storeProduct"] | order(sortOrder asc, _createdAt asc){
  _id,
  title,
  "slug": slug.current,
  productType,
  status,
  price,
  shortDescription,
  description,
  stripePriceId,
  sortOrder,
  primaryImage{
    alt,
    "url": asset->url,
    "metadata": asset->metadata{
      lqip,
      dimensions
    }
  },
  gallery[]{
    alt,
    "url": asset->url,
    "metadata": asset->metadata{
      lqip,
      dimensions
    }
  }
}`;

export const storeProductBySlugQuery = groq`*[_type == "storeProduct" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  productType,
  status,
  price,
  shortDescription,
  description,
  stripePriceId,
  sortOrder,
  primaryImage{
    alt,
    "url": asset->url,
    "metadata": asset->metadata{
      lqip,
      dimensions
    }
  },
  gallery[]{
    alt,
    "url": asset->url,
    "metadata": asset->metadata{
      lqip,
      dimensions
    }
  }
}`;

export const storeProductSlugsQuery = groq`*[_type == "storeProduct" && defined(slug.current)][]{
  "slug": slug.current
}`;

export const storeProductsByIdsQuery = groq`*[_type == "storeProduct" && _id in $ids]{
  _id,
  title,
  "slug": slug.current,
  productType,
  status,
  price,
  shortDescription,
  description,
  stripePriceId,
  sortOrder,
  primaryImage{
    alt,
    "url": asset->url,
    "metadata": asset->metadata{
      lqip,
      dimensions
    }
  },
  gallery[]{
    alt,
    "url": asset->url,
    "metadata": asset->metadata{
      lqip,
      dimensions
    }
  }
}`;
