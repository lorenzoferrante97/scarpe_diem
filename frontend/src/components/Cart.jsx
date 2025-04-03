import { useGlobalContext } from '../contexts/GlobalContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cart, cleanCart, setCartToLocal } = useGlobalContext();

  console.log('cart: ', cart);

  useEffect(() => {
    setCartToLocal();
  }, []);

  return (
    <>
      <main>
        <section className="cart-header">
          <h1 className="h1">Carrello</h1>
        </section>
        {/* elenco card carrello */}
        <section className="cart-products-list">
          {cart?.map((product, i) => {
            const { name, image, price, selectedSize, selectedQuantity } = product;

            return (
              <div key={i} className="cart-card">
                <figure className="cart-card-img">
                  <img src={image} alt="" />
                </figure>
                {/* card info */}
                <div className="cart-card-info">
                  <span>{name}</span>
                  {/*Size*/}
                  <div>
                    <span>Taglia:</span>
                    <span>{selectedSize}</span>
                  </div>
                  {/* quantity */}
                  <div>
                    <span>Quantità:</span>
                    <span>{selectedQuantity}</span>
                  </div>
                  {/* price */}
                  <div>
                    <span>Prezzo:</span>
                    <span>€{price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
        <section className="cart-actions">
          <Link to={'/checkout'} className="btn btn-accent">
            Procedi al Checkout
          </Link>
          <button onClick={() => cleanCart()}>Svuota Carrello</button>
        </section>
      </main>
    </>
  );
}
