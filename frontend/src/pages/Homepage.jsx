import HeroCarousel from '../components/HeroCarousel/HeroCarousel';
import Carousel from '../components/Carousel/Carousel';
import { useGlobalContext } from '../contexts/GlobalContext';
import { useEffect } from 'react';

export default function HomePage() {
  // global context values
  const { mostSelled, fetchMostSelled } = useGlobalContext();

  useEffect(() => {
    fetchMostSelled();
  }, []);

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
          <figure className="hero-coupon-img">
            <img src="graphics/hero-coupon.png" alt="" />
          </figure>
        </div>
      </section>
      {/* i più venduti */}
      <section id="home-mostselled" className="carousel-section">
        {mostSelled ? <Carousel array={mostSelled} /> : <p>Most Selled non caricati</p>}
        {/* <Carousel array={mostSelled} /> */}
      </section>
    </main>
  );
}
