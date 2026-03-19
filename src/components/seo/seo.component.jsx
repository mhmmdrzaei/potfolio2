import Head from 'next/head';

function trimSlash(value = '') {
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

function joinUrl(baseUrl, path = '/') {
  if (!baseUrl) {
    return null;
  }

  const normalizedBase = trimSlash(baseUrl);
  const normalizedPath = path === '/' ? '' : path;

  return `${normalizedBase}${normalizedPath}`;
}

export default function Seo({ seo = {}, pageTitle, description, path = '/' }) {
  const title = pageTitle || seo.siteName || seo.metaTitle || 'Mohammad Rezaei';
  const metaDescription = description || seo.metaDescription || '';
  const canonicalUrl = joinUrl(seo.canonicalBaseUrl, path);
  const ogImageUrl = seo.openGraphImage?.url || null;
  const siteName = seo.siteName || 'Mohammad Rezaei';
  const robots = seo.robotsNoIndex ? 'noindex, nofollow' : 'index, follow';
  const twitterCard = seo.twitterCard || 'summary_large_image';

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {metaDescription ? <meta name="description" content={metaDescription} /> : null}
      <meta name="robots" content={robots} />
      <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {metaDescription ? <meta property="og:description" content={metaDescription} /> : null}
      <meta property="og:site_name" content={siteName} />
      {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
      {ogImageUrl ? <meta property="og:image" content={ogImageUrl} /> : null}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      {metaDescription ? <meta name="twitter:description" content={metaDescription} /> : null}
      {seo.twitterHandle ? <meta name="twitter:site" content={seo.twitterHandle} /> : null}
      {ogImageUrl ? <meta name="twitter:image" content={ogImageUrl} /> : null}

      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
    </Head>
  );
}
