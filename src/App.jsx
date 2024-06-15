import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductPage from './pages/Home/Product/ProductPage';
import Favourite from './pages/Favourite/Favourite';
import Cart from './pages/Cart/Cart';
import SingleProductPage from './pages/Home/SingleProduct/SingleProductPage';
import Checkout from './pages/Checkout/Checkout';
import Registration from './pages/Registration/Registration';

const PageContent = () => {
  const location = useLocation();
  const noHeaderFooter = location.pathname === '/registration';

  return (
    <>
      {!noHeaderFooter && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/product/:category' element={<ProductPage />} />
        <Route path="/product/:category/:brand" element={<ProductPage />} />
        <Route path='/single_product/:id' element={<SingleProductPage />} />
        <Route path='/wishlist' element={<Favourite />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
      {!noHeaderFooter && <Footer />}
    </>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <PageContent />
    </BrowserRouter>
  );
}

export default App;
