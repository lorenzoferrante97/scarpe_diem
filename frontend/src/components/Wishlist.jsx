import { useGlobalContext } from '../contexts/GlobalContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function WishList() {
  const { wishlist, cleanWishlist, setWishlistToLocal, addToCart, setCartToLocal, selectedSizeId, formData, removeProductFromWishList } = useGlobalContext();

  useEffect(() => {
    setWishlistToLocal();
    // setCartToLocal();
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
            const { slug, id, name, image, price, selectedSize, selectedQuantity, size_id } = product;

            const total = price * selectedQuantity;

            return (
              <div key={i} className="cart-card">
                <figure className="cart-card-img">
                  <img src={image} alt="" />
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
                  <div className="info-box">
                    <span>Totale:</span>
                    <span className="info-total-price">&euro;{Number(total.toFixed(2))}</span>
                  </div>
                  <Link to={`/product/${slug}`} className="btn btn-accent">
                    VAI AL PRODOTTO
                  </Link>
                </div>
                <button className="btn-remove-cart-top " onClick={() => removeProductFromWishList(id, size_id)}>
                  X
                </button>
              </div>
            );
          })}
        </section>

        <section className="cart-actions">
          {/* <button className="btn-accent" onClick={() => addToCart(product, selectedSizeId, formData.quantity)}>
            Svuota Wishlist
          </button> */}
          <button className="btn-sec" onClick={() => cleanWishlist()}>
            Svuota Wishlist
          </button>
        </section>
      </main>
    </>
  );
}
