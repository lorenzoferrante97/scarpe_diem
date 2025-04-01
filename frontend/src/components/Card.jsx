export default function Card({ content }) {
  console.log('content', content);
  const { Prodotto, Immagine, Prezzo } = content;

  return (
    <>
      <div className="card carousel-card">
        <figure className="card-image">
          <img src={Immagine} alt={Prodotto} />
        </figure>
        <div className="card-info-box">
          <h3 className="card-title">{Prodotto}</h3>
          <span className="card-price">{Prezzo}</span>
        </div>
        <div className="card-actions-box">
          <button className="card-action-cart">
            <span style={{ color: '#ffffff' }}>A</span>
          </button>
          <button className="card-action-wishlist">
            <span style={{ color: '#000000' }}>B</span>
          </button>
        </div>
      </div>
    </>
  );
}
