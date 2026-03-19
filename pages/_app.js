import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import '../styles/globals.scss';
import CartProvider from '../src/CartContext';
import Navigation from '../src/components/navigation/navigation.component';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isStudioRoute = router.pathname.startsWith('/studio');

  if (isStudioRoute) {
    return <Component {...pageProps} />;
  }

  return (
    <CartProvider>
      <Navigation />
      <Component {...pageProps} />
    </CartProvider>
  );
}
