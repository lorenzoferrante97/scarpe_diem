import { useGlobalContext } from '../contexts/GlobalContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, cleanCart, setCartToLocal, removeProductFromCart } = useGlobalContext();

  useEffect(() => {
    setCartToLocal();
  }, []);

  console.table(cart);

  return (
    <>
      <main>
        <section className="cart-header">
          <h1 className="h1">Carrello</h1>
        </section>
        {/* elenco card carrello */}
        <section className="cart-products-list">
          {cart?.map((product, i) => {
            const { id, name, image, price, selectedSize, selectedQuantity, size_id } = product;

            const total = price * selectedQuantity;

            return (
              <div key={i} className="cart-card">
                <figure className="cart-card-img">
                  <img src={image} alt={name} />
                </figure>
                {/* card info */}
                <div className="cart-card-info">
                  <div>
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
                  </div>

                  <div className="info-box tot">
                    <span>Totale:</span>
                    <span className="info-total-price">&euro;{Number(total.toFixed(2))}</span>
                  </div>
                </div>
                {/* Bottone di eliminazione */}
                <button className="btn-remove-cart-top " onClick={() => removeProductFromCart(id, size_id)}>
                  X
                </button>
              </div>
            );
          })}
        </section>
        <section className="cart-actions">
          <Link to={'/checkout'} className="btn btn-accent">
            Riepilogo ordine
          </Link>
          <button className="btn-sec" onClick={() => cleanCart()}>
            Svuota Carrello
          </button>
        </section>
      </main>
    </>
  );
}
