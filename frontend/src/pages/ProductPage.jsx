import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext';
import Carousel from './../components/Carousel/Carousel';

export default function ProductPage() {
  const { addToCart, setCartToLocal, productHandleMultiInput, formData, setWishlistToLocal, addToWishlist, selectedSizeId, setSizeId, maxQuantity, setMaxQuantityId, resetFormData } = useGlobalContext();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState(null);

  const { slug } = useParams();

  useEffect(() => {
    resetFormData();
    setSizeId(0);
    setMaxQuantityId(1);
  }, []);

  useEffect(() => {
    fetchProduct(slug);
    setCartToLocal();
    setWishlistToLocal();
  }, [slug]);

  //  controllo se il prodotto è stato caricato
  // se è stato caricato allora faccio la ricerca
  useEffect(() => {
    if (product) {
      handleRelated();
    }
  }, [product]);

  const handleRelated = () => {
    fetch(`http://localhost:3000/products/related?categoryId=${product?.category_id}&slug=${slug}`)
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

  // const { size, quantity } = formData;
  // const [maxQuantity, setMaxQuantity] = useState(1);

  // const [selectedSizeId, setSelectedSizeId] = useState(null);

  return (
    <main>
      {/* Sezione prodotto */}
      <section className="product-section">
        <figure className="product-image">
          <img src={product?.image} alt={product?.name} />
        </figure>

        <div className="product-info">
          <div className="product-details">
            <h1 className="h1"> {product?.name} </h1>
            <p>{product?.description}</p>
            <p className="product-price">{product?.price}</p>
          </div>

          <div className="product-form-box">
            <label className="text-big" htmlFor="size">
              Taglia
            </label>
            {/* seleziona taglia */}
            <select
              name="size"
              className="product-input"
              onChange={(e) => {
                const selectedSizeNumber = e.target.value;
                const selectedSize = product?.sizes.find((sizeObj) => sizeObj.size_number == selectedSizeNumber);
                if (selectedSize) {
                  // setMaxQuantity(selectedSize.quantity); // Imposta la quantità massima disponibile
                  setMaxQuantityId(selectedSize.quantity);
                  setSizeId(selectedSize.size_id);
                  // setSelectedSizeId(selectedSize.size_id); // Salva il size_id selezionato
                }
                productHandleMultiInput(e, product, maxQuantity);
              }}
            >
              <option value="">Seleziona taglia</option>
              {product?.sizes.map((size) => (
                <option key={size.size_id} value={size.size_number}>
                  {size.size_number}
                </option>
              ))}
            </select>

            <div className="product-quantity-box">
              <label htmlFor="quantity" className="text-big">
                Quantità
              </label>
              <div className="quantity-input-box">
                {/* seleziona quantità */}
                <input className="product-input" type="number" name="quantity" min="1" max={maxQuantity} value={formData.quantity} onChange={(e) => productHandleMultiInput(e, product, maxQuantity)} />

                {/* alert quantità disponibile */}
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
              <button className="btn-accent" onClick={() => addToCart(product, selectedSizeId, formData.quantity)}>
                Aggiungi al carrello
              </button>
              <button className="btn-sec" onClick={() => addToWishlist(product, selectedSizeId, formData.quantity)}>
                Aggiungi alla Wishlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione prodotti correlati */}

      {related && (
        <section id="home-category" className="carousel-section">
          {Array.isArray(related) && related.length > 0 ? <Carousel array={related} topic="related" /> : <p>Prodotti correlati non disponibili</p>}
        </section>
      )}
    </main>
  );
}
