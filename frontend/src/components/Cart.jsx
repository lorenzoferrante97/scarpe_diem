import { useGlobalContext } from '../contexts/GlobalContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, cleanCart, setCartToLocal } = useGlobalContext();

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

            const total = price * selectedQuantity;

            return (
              <div key={i} className="cart-card">
                <figure className="cart-card-img">
                  <img src={image} alt="" />
                </figure>
                {/* card info */}
                <div className="cart-card-info">
                  <span className="text-big info-name">{name}</span>
                  {/*Size*/}
                  <div className="info-box">
                    <div className="info-value-box">
                      <span className="info-value">{selectedSize}</span>
                    </div>
                    {/* quantity */}
                    <div className="">
                      <span className="">x{selectedQuantity}</span>
                    </div>
                  </div>
                  <div className="info-box">
                    <span>Totale:</span>
                    <span className="info-total-price">&euro;{Number(total.toFixed(2))}</span>
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
          <button className="btn-sec" onClick={() => cleanCart()}>
            Svuota Carrello
          </button>
        </section>
      </main>
    </>
  );
}
