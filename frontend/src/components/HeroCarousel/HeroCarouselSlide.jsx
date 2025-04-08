import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroCarouselSlide({ oggetto, type }) {
  return (
    <>
      {/* slide */}
      {oggetto ? (
        <Link to={`/product/${oggetto?.slug}`} className="hero-slide">
          <div>
            <div className="content">
              {/* slide info */}
              <div className="info">
                <p>{type === 'mostSelled' ? 'La più venduta' : 'La più recente'}</p>
                <p className="text-big hero-text">{oggetto?.Prodotto || 'Nome del prodotto'}</p>
              </div>
              {/* slide button */}
              {/* <button className="btn btn-accent w-fit">
                Aggiungi al carrello
              </button> */}
              {/* slide img */}
              <figure className="carousel-img">
                <img src={oggetto?.Immagine || 'graphics/sneaker-mostselled.png'} alt={oggetto?.Prodotto || 'Immagine del prodotto'} />
              </figure>
            </div>
          </div>
        </Link>
      ) : (
        <div className="hero-slide">
          <div className="content">
            <div className="info">
              <p>Caricamento...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
