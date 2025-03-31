import HeroCarousel from '../components/HeroCarousel/HeroCarousel';

export default function HomePage() {
  return (
    <main>
      <section id="hero-section" className="hero">
        <HeroCarousel autoSlideInterval={7000} />
        {/* hero coupon */}
        <div className="hero-discount-box">
          <div className="info">
            <p className="text-big">Coupon di Primavera!</p>
            <div className="discount-code">
              <p className="code">Sconto-10</p>
            </div>
          </div>
        </div>
      </section>
      {/* i più venduti */}
      <section id="home-mostselled"></section>
    </main>
  );
}
