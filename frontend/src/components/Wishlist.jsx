import { useGlobalContext } from '../contexts/GlobalContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { wishlist, cleanWishlist, setWishlistToLocal } = useGlobalContext();

  useEffect(() => {
    // setWishlistToLocal();
  }, []);

  return (
    <>
      <main>
        <section className="cart-header">
          <h1 className="h1">Wishlist</h1>
        </section>
        {/* elenco card carrello */}
        <section className="cart-products-list">
          {wishlist?.map((product, i) => {
            const { name, image, price, selectedSize, selectedQuantity, totalPrice } = product;

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
          {/* <Link to={'/checkout'} className="btn btn-accent">
            Procedi al Checkout
          </Link> */}
          <button className="btn-sec" onClick={() => cleanWishlist()}>
            Svuota Wishlist
          </button>
        </section>
      </main>
    </>
  );
}
