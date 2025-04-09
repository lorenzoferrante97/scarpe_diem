import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import Carousel from "./../components/Carousel/Carousel";

export default function ProductPage() {
  const {
    addToCart,
    setCartToLocal,
    productHandleMultiInput,
    formData,
    setWishlistToLocal,
    addToWishlist,
    selectedSizeId,
    setSizeId,
    maxQuantity,
    setMaxQuantityId,
    resetFormData,
    cart,
    isProductValid,
    validateProduct,
    setIsProductValid,
    removeFromWishlist,
    isInWishlist,
  } = useGlobalContext();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState(null);

  const { slug } = useParams();

  useEffect(() => {
    resetFormData();
    setSizeId(0);
    setMaxQuantityId(1);
    setIsProductValid(true);
    fetchProduct(slug);
    setCartToLocal();
    setWishlistToLocal();
  }, [slug]);

  useEffect(() => {
    if (product) {
      handleRelated();
    }
  }, [product]);

  const handleRelated = () => {
    fetch(
      `http://localhost:3000/products/related?categoryId=${product?.category_id}&slug=${slug}`
    )
      .then((response) => response.json())
      .then((data) => setRelated(data))
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchProduct = (slug) => {
    fetch(`http://localhost:3000/products/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [buttonText, setButtonText] = useState("Aggiungi al carrello");
  const [buttonClasses, setButtonClasses] = useState("btn-accent");

  const handleClick = () => {
    setButtonText("Aggiunto al carrello!");
    setButtonClasses("btn-success");
  };

  const resetButton = () => {
    setTimeout(() => {
      setButtonText("Aggiungi al carrello");
      setButtonClasses("btn-accent");
    }, 3000);
  };


  const handleWishlistClick = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product, selectedSizeId, formData.quantity);
    }
  };
  return (
    <main>
      <section className="product-section">
        <figure className="product-image">
          <img src={product?.image} alt={product?.name} />
        </figure>

        <div className="product-info">
          <div className="product-details">
            <h1 className="h1"> {product?.name} </h1>
            <p>{product?.description}</p>
            <p className="product-price">€{product?.price}</p>
          </div>

          <div className="product-form-box">

            <label className="text-big">Taglia</label>
            <div className="size-selector">
              {product?.sizes.map((size) => {
                const isSelected = selectedSizeId === size.size_id;
                const isOutOfStock = size.quantity === 0;

                return (
                  <label
                    key={size.size_id}
                    className={`size-option ${isSelected ? "selected" : ""} ${
                      isOutOfStock ? "disabled" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={size.size_number}
                      checked={isSelected}
                      disabled={isOutOfStock}
                      onChange={(e) => {
                        if (isOutOfStock) return;
                        const selectedSizeNumber = e.target.value;
                        const selectedSize = product?.sizes.find(
                          (sizeObj) =>
                            sizeObj.size_number == selectedSizeNumber
                        );

                        if (!selectedSizeNumber) {
                          setSizeId(0);
                          setMaxQuantityId(1);
                          setIsProductValid(false);
                        } else if (selectedSize) {
                          setMaxQuantityId(selectedSize.quantity);
                          setSizeId(selectedSize.size_id);
                          setIsProductValid(true);
                        }

                        productHandleMultiInput(e, product, maxQuantity);
                      }}
                    />
                    {size.size_number}
                  </label>

                );
              })}
            </div>

            <div
              className={`size-error-box ${
                isProductValid === true ? "hidden" : ""
              }`}
            >
              <p className="size-error-text">Seleziona una taglia</p>
            </div>

            <div className="product-quantity-box">
              <label htmlFor="quantity" className="text-big">
                Quantità
              </label>
              <div className="quantity-input-box">
                <input
                  className="product-input"
                  type="number"
                  name="quantity"
                  min="1"
                  max={maxQuantity}
                  value={formData.quantity}
                  onChange={(e) =>
                    productHandleMultiInput(e, product, maxQuantity)
                  }
                />
                {formData.size === 0 ? (
                  <span></span>
                ) : (
                  <div className="alert-quantity">
                    <span>{maxQuantity} prodotti disponibili</span>
                  </div>
                )}
              </div>
            </div>

            <div className="card-actions-box buttons-container">
              <button
                className={buttonClasses}
                onClick={() => {
                  if (validateProduct(selectedSizeId)) {
                    handleClick();
                    resetButton();
                    addToCart(product, selectedSizeId, formData.quantity);
                  }
                }}
              >
                {buttonText}
              </button>
              <button className="btn-sec" onClick={handleWishlistClick}>
                {isInWishlist(product?.id)
                  ? "Rimuovi dalla Wishlist"
                  : "Aggiungi alla Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {related && (
        <section id="home-category" className="carousel-section">
          {Array.isArray(related) && related.length > 0 ? (
            <Carousel array={related} topic="related" />
          ) : (
            <p>Prodotti correlati non disponibili</p>
          )}
        </section>
      )}
    </main>
  );
}

