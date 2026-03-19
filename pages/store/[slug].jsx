import Link from 'next/link';
import Layout from '../../src/components/layout/layout.component';
import Seo from '../../src/components/seo/seo.component';
import StoreCart from '../../src/components/store/storeCart.component';
import StoreProductDetail from '../../src/components/store/storeProductDetail.component';
import { getSiteData } from '../../lib/siteData';
import { getStoreProductBySlug, getStoreProductSlugs } from '../../lib/storeData';

export default function StoreProductPage({ data, product }) {
  return (
    <Layout emailAddress={data.email_address} contact={data.contact}>
      <Seo
        seo={data.seo}
        pageTitle={`${product.title} | ${data.seo?.siteName || 'Mohammad Rezaei'}`}
        description={product.shortDescription}
        path={`/store/${product.slug}`}
      />

      <section className="storePage">
        <div className="storeDetailTop">
          <Link href="/store" className="storeBackLink">
            Back to store
          </Link>
          <StoreCart />
        </div>

        <StoreProductDetail product={product} />
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = await getStoreProductSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: { slug }
    })),
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const [data, product] = await Promise.all([getSiteData(), getStoreProductBySlug(params.slug)]);

  if (!product) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data,
      product
    },
    revalidate: 1
  };
}
