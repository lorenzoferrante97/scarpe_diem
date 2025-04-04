import { GlobalProvider } from './contexts/GlobalContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // router
import DefaultLayout from './layouts/DefaultLayout'; // layouts
import Homepage from './pages/Homepage'; // pages
import ProductPage from './pages/ProductPage'; //product
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import SearchPage from './pages/SerchPage';
import NotFound404 from './pages/notFound404';
import Wishlist from './components/Wishlist';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={Homepage}></Route>
            <Route path="/product/:slug" Component={ProductPage}></Route>
            <Route path="/cart" Component={Cart}></Route>
            <Route path="/search" Component={SearchPage}></Route>
            <Route path="/checkout" Component={Checkout}></Route>
            <Route path="/wishlist" Component={Wishlist}></Route>
            <Route path="*" Component={NotFound404}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
