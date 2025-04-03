import { Link } from 'react-router-dom';

export default function Card({ content }) {
  const { Prodotto, Immagine, Prezzo, slug } = content;

  return (
    <>
      <Link to={`/product/${slug}`} className="card carousel-card">
        <figure className="card-image">
          <img src={Immagine || content.image} alt={Prodotto || content.name} />
        </figure>
        <div className="card-info-box">
          <h3 className="card-title">{Prodotto || content.name}</h3>
          <span className="card-price">&euro;{Prezzo || content.price}</span>
        </div>
        <div className="card-actions-box">
          <button className="card-action-cart">
            <span style={{ color: '#ffffff' }}>A</span>
          </button>
          <button className="card-action-wishlist">
            <span style={{ color: '#000000' }}>B</span>
          </button>
        </div>
      </Link>
    </>
  );
}
