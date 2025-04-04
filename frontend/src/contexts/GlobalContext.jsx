import { createContext, useState, useContext } from 'react';

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
  const [wishlist, setWishlist] = useState([]);

  const setCartToLocal = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  };
  // wishlist to local
  const setWishlistToLocal = () => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist'));
    if (savedWishlist) {
      setWishlist(savedWishlist);
    }
  };

  let isExistingProduct = false;
  let existingProductId = 0;

  const [foundExistingProduct, setFoundExistingProduct] = useState(null);

  const addToCart = (product, size_id, quantity) => {
    let newCart = [];

    setCart((prevCart) => {
      // verificare se il prodotto esiste già nel carrello

      newCart = [
        ...prevCart,
        {
          ...product,

          size_id: size_id, // Usa sempre questa variabile per consistenza
          selectedQuantity: quantity, // La quantità selezionata
          selectedSize: formData.size,
        },
      ];

      localStorage.setItem('cart', JSON.stringify(newCart));

      // controlli per prodotto già inserito
      const prevStorage = JSON.parse(localStorage.getItem('cart'));

      // se c'è qualcosa nel local storage, controlli
      if (prevStorage.length > 1) {
        // console.table(prevStorage);
        prevStorage?.forEach((product) => {
          // console.table(product);
          const { id } = product;

          if (product.size_id == size_id) {
            isExistingProduct = true;
            existingProductId = id;
          }
        });
      }

      if (isExistingProduct) {
        // find il prodotto esistente

        setFoundExistingProduct(prevCart?.find((product) => product.id === existingProductId));

        // aggiorna quantità prodotto esistente
        setFoundExistingProduct({
          ...foundExistingProduct,
          selectedQuantity: selectedQuantity + quantity,
        });

        // trova ed elimina il vecchio prodotto da aggiornare in quantità
        const productIndexToDelete = prevCart.findIndex((product) => product.id == foundExistingProduct?.id);

        // ricavare index nell'array in base a queste condizioni: -> scarpe che hanno stesso id && stessa taglia di foundExistingProduct

        // eliminare i product con quegli index in un ciclo
        prevCart.splice(productIndexToDelete, 1);

        // trovare il modo di aggiungere quella con quantità aggiornata (foundExistingProduct)
        newCart = [...prevCart, foundExistingProduct];
      } else {
        null;
      }

      return newCart;
    });
  };

  // add to wishlist
  const addToWishlist = (product, size_id, quantity) => {
    setWishlist((prevWish) => {
      const newWish = [
        ...prevWish,
        {
          ...product,

          size_id: size_id, // Usa sempre questa variabile per consistenza
          selectedQuantity: quantity, // La quantità selezionata
          selectedSize: formData.size,
        },
      ];
      localStorage.setItem('wishlist', JSON.stringify(newWish));
      return newWish;
    });
  };

  const cleanCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const cleanWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
  };

  // SIZES & QUANTITY PRODUCT PAGE
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const [formData, setFormData] = useState({ size: 0, quantity: 1 });

  const resetFormData = () => {
    setFormData({ size: 0, quantity: 1 });
  };

  const productHandleMultiInput = (e, product, maxQuantity) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      const newData = Math.min(value, maxQuantity);
      setFormData({ ...formData, [name]: newData });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // serchBar -------------------------------------

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/products/search?name=${searchTerm}&name_category=${searchTerm}&name_brand=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
      .catch((error) => {
        console.error(error);
      });
  };

  // global size id
  const [selectedSizeId, setSelectedSizeId] = useState(0);

  const setSizeId = (selectedSize) => {
    setSelectedSizeId(selectedSize);
  };

  // globa max quantity
  const [maxQuantity, setMaxQuantity] = useState(1);

  const setMaxQuantityId = (maxQuantity) => {
    setMaxQuantity(maxQuantity);
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
    productHandleMultiInput,
    formData,
    setSearchTerm,
    searchResults,
    handleSearch,
    setWishlistToLocal,
    wishlist,
    cleanWishlist,
    addToWishlist,
    setSizeId,
    selectedSizeId,
    maxQuantity,
    setMaxQuantityId,
    resetFormData,
  };
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
