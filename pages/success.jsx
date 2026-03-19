import { useContext, useEffect } from 'react';
import Link from 'next/link';
import { CartContext } from '../src/CartContext';
import Layout from '../src/components/layout/layout.component';
import Seo from '../src/components/seo/seo.component';
import { getSiteData } from '../lib/siteData';

export default function Success({ data }) {
  const cart = useContext(CartContext);

  useEffect(() => {
    cart.clearCart();
  }, [cart]);

  return (
    <Layout emailAddress={data.email_address} contact={data.contact}>
      <Seo
        seo={data.seo}
        pageTitle={`Purchase Complete | ${data.seo?.siteName || 'Mohammad Rezaei'}`}
        path="/success"
      />
      <section className="successPage">
        <h2>Thank you for your Purchase. You rule!</h2>
        <p>
          back to <Link href="/store">Store</Link> or back to <Link href="/">Home</Link>
        </p>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getSiteData();

  return {
    props: {
      data
    },
    revalidate: 1
  };
}
