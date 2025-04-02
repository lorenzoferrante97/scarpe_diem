import { createContext, useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const updateActiveDotIndex = (index) => {
    setActiveDotIndex(index);
  };

  // LOGICA HOME -------------------------------------------------

  // most selled products
  const [mostSelled, setMostSelled] = useState(null);

  const fetchMostSelled = () => {
    fetch('http://localhost:3000/products/bestsellers')
      .then((response) => response.json())
      .then((data) => setMostSelled(data))
      .catch((error) => {
        console.error(error);
      });
  };

  // category products
  const [categoryProducts, setCategoryProducts] = useState(null);

  const fetchCategoryProducts = () => {
    fetch('http://localhost:3000/products/category?name_category=casual') // /category?category=running
      .then((response) => response.json())
      .then((data) => setCategoryProducts(data))
      .catch((error) => {
        console.error(error);
      });
  };

  // most selled product
  const [mostSelledProduct, setMostSelledProduct] = useState(null);

  // const fetchMostSelledProduct = () => {
  //   fetch('http://localhost:3000/products/bestseller')
  //     .then((response) => response.json())
  //     .then((data) => setMostSelledProduct(data[0]))
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  const fetchMostSelledProduct = () => {
    fetch('http://localhost:3000/products/bestseller')
      .then((response) => response.json())
      .then((data) => {
        setMostSelledProduct(data);
      })
      .catch((error) => {
        console.error('Errore nel recupero del prodotto più venduto:', error);
      });
  };

  // most recent product
  const [mostRecentProduct, setMostRecentProduct] = useState(null);

  const fetchMostRecentProduct = () => {
    fetch('http://localhost:3000/products/newarrival')
      .then((response) => response.json())
      .then((data) => setMostRecentProduct(data))
      .catch((error) => {
        console.error(error);
      });
  };

  // CARRELLO ------------------------------------------

  const [cart, setCart] = useState([]);

  const setCartToLocal = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, product];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });

    localStorage.setItem('cart', JSON.stringify([...cart, product]));
  };

  const cleanCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // WISHLIST -------------------------------------

  const [wishlist, setWishlist] = useState([]);

  const setWishlistToLocal = () => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist'));
    if (savedWishlist) {
      setCart(savedWishlist);
    }
  };

  const addToWishlist = (product) => {
    setWishlist((prevWish) => {
      const newWishlist = [...prevWish, product];
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });

    localStorage.setItem('wishlist', JSON.stringify([...wishlist, product]));
  };

  const cleanWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
  };

  // SIZES & QUANTITY PRODUCT PAGE
  // const [selectedSize, setSelectedSize] = useState(0);
  // const [selectedQuantity, setSelectedQuantity] = useState(0);

  const [formData, setFormData] = useState({ size: 0, quantity: 0 });

  const productHandleMultiInput = (e, product) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // const arraySizes = product?.sizes.split(',').map(Number);
    // const arrayQuantities = product?.quantities.split(',').map(Number);
    // for (let y = 0; y < arraySizes.length; y++) {
    //   arraySizes[y] == formData.size ? setMaxQuantity(arrayQuantities[y]) : null;
    // }
  };

  const value = {
    activeDotIndex,
    mostSelled,
    categoryProducts,
    mostSelledProduct,
    updateActiveDotIndex,
    fetchMostSelled,
    fetchCategoryProducts,
    fetchMostSelledProduct,
    mostRecentProduct,
    fetchMostRecentProduct,
    cart,
    addToCart,
    setCartToLocal,
    cleanCart,
    setWishlistToLocal,
    addToWishlist,
    cleanWishlist,
    productHandleMultiInput,
    formData,
  };
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
