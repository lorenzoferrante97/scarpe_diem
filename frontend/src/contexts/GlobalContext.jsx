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
  // wishlist to local
  const setWishlistToLocal = () => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist'));
    if (savedWishlist) {
      setWishlist(savedWishlist);
    }
  };

  const setCartToLocal = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  };

  let existingProductId = 0;

  const [foundExistingProduct, setFoundExistingProduct] = useState(null);

  const addToCart = (product, size_id, quantity) => {
    let newCart = [];
    let updatedNewCart = [];

    setCart((prevCart) => {
      // verificare se il prodotto esiste già nel carrello

      // check prima di tutto se esiste già in prevcart prodotto con stessa taglia
      const existingProduct = prevCart?.find((prevProduct) => prevProduct.id == product.id && prevProduct.size_id == size_id);

      if (existingProduct) {
        const updatedProduct = {
          ...existingProduct,
          selectedQuantity: existingProduct.selectedQuantity + quantity,
        };

        updatedNewCart = prevCart.filter((prevProduct) => prevProduct.id != existingProduct.id || prevProduct.size_id != existingProduct.size_id);

        updatedNewCart.push(updatedProduct);
      } else {
        newCart = [
          ...prevCart,
          {
            ...product,

            size_id: size_id, // Usa sempre questa variabile per consistenza
            selectedQuantity: quantity, // La quantità selezionata
            selectedSize: formData.size,
          },
        ];
      }

      if (updatedNewCart.length > 0) {
        localStorage.setItem('cart', JSON.stringify(updatedNewCart));
        return updatedNewCart;
      } else {
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      }
    });
  };

  const removeProductFromCart = (productId, sizeId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.id !== productId || item.size_id !== sizeId
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  
  const removeProductFromWishList = (productId, sizeId) => {
    setWishlist((prevWish) => {
      const updatedWish = prevWish.filter(
        (item) => item.id !== productId || item.size_id !== sizeId
      );
      localStorage.setItem('wishlist', JSON.stringify(updatedWish));
      return updatedWish;
    });
  };


  const removeFromWishlist = (productId) => {
  setWishlist((prevWishlist) => {
    const updatedWishlist = prevWishlist.filter((item) => item.id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    return updatedWishlist;
  });
};

const isInWishlist = (productId) => {
  return wishlist.some((item) => item.id === productId);
};
  // add to wishlist
  // const addToWishlist = (product, size_id, quantity) => {
  //   setWishlist((prevWish) => {
  //     const newWish = [
  //       ...prevWish,
  //       {
  //         ...product,

  //         size_id: size_id, // Usa sempre questa variabile per consistenza
  //         selectedQuantity: quantity, // La quantità selezionata
  //         selectedSize: formData.size,
  //       },
  //     ];
  //     localStorage.setItem('wishlist', JSON.stringify(newWish));
  //     return newWish;
  //   });
  // };

  const addToWishlist = (product, size_id, quantity) => {
    let newWish = [];
    let updateNewWishlist = [];

    setWishlist((prevWish) => {
      const existingProduct = prevWish?.find((prevProduct) => prevProduct.id == product.id && prevProduct.size_id == size_id);

      if (existingProduct) {
        const updatedProduct = {
          ...existingProduct,
          selectedQuantity: existingProduct.selectedQuantity + quantity,
        };

        updateNewWishlist = prevWish.filter((prevProduct) => prevProduct.id != existingProduct.id || prevProduct.size_id != existingProduct.size_id);

        updateNewWishlist.push(updatedProduct);
      } else {
        newWish = [
          ...prevWish,
          {
            ...product,

            size_id: size_id, // Usa sempre questa variabile per consistenza
            selectedQuantity: quantity, // La quantità selezionata
            selectedSize: formData.size,
          },
        ];
      }

      if (updateNewWishlist.length > 0) {
        localStorage.setItem('wishlist', JSON.stringify(updateNewWishlist));
        return updateNewWishlist;
      } else {
        localStorage.setItem('wishlist', JSON.stringify(newWish));
        return newWish;
      }
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
    setFormData(prev => ({ ...prev, [name]: newData }));
  } else {
    setFormData(prev => ({ ...prev, [name]: value, quantity: 1 }));
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
  // Coupon active -------------------------------------
const [couponActive, setCouponActive] = useState('');
  function handleCouponActive(){
    fetch('http://localhost:3000/products/coupons')
      .then((response) => response.json())
      .then((data) => {
        setCouponActive(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  //! validazione product
  const [isProductValid, setIsProductValid] = useState(true);

  // const validateProduct = (selectedSizeId) => {
  //   if (selectedSizeId == 0) {
  //     setIsProductValid(false);
  //     console.log('selectedSizeId da global', selectedSizeId);
  //     console.log('isProductValid da global', isProductValid);
  //   }
  // };
const validateProduct = (selectedSizeId) => {
  // Controlla anche formData.size per sicurezza
  if (selectedSizeId === 0 || formData.size === "" || formData.size === 0) {
    setIsProductValid(false);
    return false;
  }
  setIsProductValid(true);
  return true;
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
    removeProductFromCart,
    removeProductFromWishList,
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
    isProductValid,
    validateProduct,
    handleCouponActive,
    couponActive,
    setIsProductValid,removeFromWishlist,
        isInWishlist,
    
  };
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
