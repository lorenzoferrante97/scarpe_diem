export default function HeroCarouselSlide() {
  return (
    <>
      {/* slide */}
      <div className="hero-slide">
        <div className="content">
          {/* slide info */}
          <div className="info">
            <p>La più venduta</p>
            <p className="text-big">Air Max 07</p>
          </div>
          {/* slide button */}
          <button className="btn btn-accent w-fit">Aggiungi al carrello</button>
          {/* slide img */}
          <figure className="carousel-img">
            <img src="graphics/sneaker-mostselled.png" alt="" />
          </figure>
        </div>
      </div>
    </>
  );
}
