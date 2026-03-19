import { Routes, Route } from 'react-router-dom';
import Home from './routes/home.routes.jsx'
import Works from './routes/works.routes.jsx'
import MusicVideos from './routes/videos.routes.jsx'
import Navigation from './routes/navigation.routes.jsx'
import { ParallaxProvider } from 'react-scroll-parallax';
import "animate.css/animate.min.css";
import Store from './routes/store.routes.jsx'
import CartProvider from './CartContext.js';
import Cancel from './routes/cancel.routes.jsx';
import Success from './routes/success.routes.jsx';
function App() {
 

  return (
    <CartProvider>
    <ParallaxProvider>

    <Routes>
    <Route path="/" element={ <Navigation />} >
      <Route index element={ <Home /> } />
      <Route path="/works" element={ <Works /> } />
      <Route path="/videos" element={ <MusicVideos /> } />
      <Route path="/store" element={ <Store /> } />
      <Route path="success" element={<Success />} />
      <Route path="cancel" element={<Cancel />} />


    </Route>
    
    </Routes> 
    </ParallaxProvider>
    </CartProvider>




  );
}

export default App;