import { useGlobalContext } from '../contexts/GlobalContext';
import { useEffect } from 'react';

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
            const { name, image, price } = product;

            return (
              <div key={i} className="cart-card">
                <figure className="cart-card-img">
                  <img src={image} alt="" />
                </figure>
                {/* card info */}
                <div className="cart-card-info">
                  <span>{name}</span>
                  {/* quantity */}
                  <div>
                    <span>Quantità</span>
                    <span>2</span>
                  </div>
                  {/* price */}
                  <div>
                    <span>Prezzo</span>
                    <span>{price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
        <section className="cart-actions">
          <button>Procedi al Checkout</button>
          <button onClick={() => cleanCart()}>Svuota Carrello</button>
        </section>
      </main>
    </>
  );
}
