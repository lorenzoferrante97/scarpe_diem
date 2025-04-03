import { GlobalProvider } from './contexts/GlobalContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // router
import DefaultLayout from './layouts/DefaultLayout'; // layouts
import Homepage from './pages/Homepage'; // pages
import ProductPage from './pages/ProductPage'; //product
import Cart from './components/Cart';
import Search from './components/Search';
import Checkout from './pages/Checkout';
import SerchPage from './pages/SerchPage';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={Homepage}></Route>
            <Route path="/product/:slug" Component={ProductPage}></Route>
            <Route path="/cart" Component={Cart}></Route>
            {/* <Route path="/search" Component={Search}></Route> */}
            <Route path="/checkout" Component={Checkout}></Route>
            <Route path="/search" Component={SerchPage}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
