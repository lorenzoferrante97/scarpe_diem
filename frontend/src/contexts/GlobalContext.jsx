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

  const fetchMostSelledProduct = () => {
    fetch('http://localhost:3000/products/bestseller')
      .then((response) => response.json())
      .then((data) => setMostSelledProduct(data[0]))
      .catch((error) => {
        console.error(error);
      });
  };

  // most recent product
  const [mostRecentProduct, setMostRecentProduct] = useState(null);

  const fetchMostRecentProduct = () => {
    fetch('http://localhost:3000/products/newarrival')
      .then((response) => response.json())
      .then((data) => setMostSelledProduct(data.results[0]))
      .catch((error) => {
        console.error(error);
      });
  };

  // chiamata show per product page
  // const [product, setProduct] = useState(null);

  // const fetchProduct = (slug) => {
  //   console.log('slug in fetch: ', slug);
  //   // axios
  //   //   .get(`http://localhost:3000/products/${slug}`)
  //   //   .then((res) => setProduct(res.data))
  //   //   .catch((error) => console.error('errore nel recupero del prodotto', error));
  // };

  const value = { activeDotIndex, mostSelled, categoryProducts, updateActiveDotIndex, fetchMostSelled, fetchCategoryProducts };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
