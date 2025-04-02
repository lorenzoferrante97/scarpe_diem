export default function Hero() {
  return (
    <>
      <section className="hero-bg">
        <div className="hero-badge-img-box">
          <div className="hero-badge-box">
            <span className="badge hero-badge badge-1">Basket</span>
            <span className="badge hero-badge badge-2">Casual</span>
            <span className="badge hero-badge badge-3">Running</span>
          </div>
          {/* images */}
          <div>
            <figure className="hero-img">
              <img src="graphics/hero-sneakers.png" alt="" />
            </figure>
          </div>
        </div>
        <div className="hero-title-box">
          <h1 className="h1">La tua scarpa preferita è qui, cogli l'attimo</h1>
        </div>
      </section>
    </>
  );
}
