import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext';

export default function ProductPage() {
  const { cart, addToCart, setCartToLocal } = useGlobalContext();

  const [product, setProduct] = useState(null);

  const { slug } = useParams();

  useEffect(() => {
    fetchProduct(slug);
    setCartToLocal();
  }, []);

  const fetchProduct = (slug) => {
    fetch(`http://localhost:3000/products/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      // .then((console.log(product)))
      .catch((error) => {
        console.error(error);
      });
    // console.log(product)
  };
  // console.log(product)

  console.log('cart: ', cart);

  return (
    <main>
      {/* Sezione prodotto */}
      <section className="product-section">
        <figure className="product-image">
          <img src={product?.image} alt={product?.name} />
        </figure>

        <div className="product-info">
          <div className="product-details">
            {/* questa parte non è corretta come logica perchè la category va cercata nella tabella "category" */}

            {/* <span className="badge badge-text"> {product?.category} </span> */}
            <h1 className="h1"> {product?.name} </h1>
            <p>{product?.description}</p>
            <p className="product-price">{product?.price}</p>
          </div>

          <div className="product-actions-box">
            <label className="text-big" htmlFor="size">
              Taglia
            </label>

            {/* seleziona taglia */}
            <select>
              <option value="">Seleziona taglia</option>
              {/* map di array taglie con altri option */}
            </select>

            {/* seleziona quantità */}
            <label htmlFor="quantity">Quantità</label>
            <input type="number" name="quantity" min="1" />

            {/* <select id="size">
              <option>Seleziona una taglia</option>
              {product.size.map((size) => (
                <option key={size}> {size} </option>
              ))}
            </select> */}

            {/* mancano le icone */}
            <div className="card-actions-box buttons-container">
              <button className="btn-accent" onClick={() => addToCart(product)}>
                Aggiungi al carrello
              </button>
              <button className="btn-sec">Salva nella wishlist</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
