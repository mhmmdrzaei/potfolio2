import Layout from '../../src/components/layout/layout.component';
import Seo from '../../src/components/seo/seo.component';
import StoreCart from '../../src/components/store/storeCart.component';
import StoreProductCard from '../../src/components/store/storeProductCard.component';
import { getSiteData } from '../../lib/siteData';
import { getStoreProducts } from '../../lib/storeData';

export default function StoreIndex({ data, products }) {
  return (
    <Layout emailAddress={data.email_address} contact={data.contact}>
      <Seo seo={data.seo} pageTitle={`Store | ${data.seo?.siteName || 'Mohammad Rezaei'}`} path="/store" />

      <section className="storePage">
        <div className="storeIntro">
          <div>
            <h2>Books, prints, and editions.</h2>
            <p>
              Here is a selection of my work available for purchase. These are mostly books that I've self published, designed by myself or in collaboration with friends. If you're interested in purchasing something or have any questions, please don't hesitate to contact me.
            </p>
          </div>
          <StoreCart />
        </div>

        <div className="storeGrid">
          {products.map((product) => (
            <StoreProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const [data, products] = await Promise.all([getSiteData(), getStoreProducts()]);

  return {
    props: {
      data,
      products
    },
    revalidate: 1
  };
}
