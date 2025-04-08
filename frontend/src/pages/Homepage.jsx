import HeroCarousel from '../components/HeroCarousel/HeroCarousel';
import Carousel from '../components/Carousel/Carousel';
import { useGlobalContext } from '../contexts/GlobalContext';
import { useEffect } from 'react';
import Hero from '../components/Hero';
import HeroDiscount from '../components/HeroDiscount';

export default function HomePage() {
  // global context values
  const { mostSelled, categoryProducts, fetchMostSelled, fetchCategoryProducts } = useGlobalContext();

  useEffect(() => {
    fetchMostSelled();
    fetchCategoryProducts();
  }, []);

  return (
    <main>
      <section id="hero-section" className="hero">
        <HeroCarousel autoSlideInterval={7000} />
        {/* hero coupon */}
        {/* <div className="hero-discount-box">
          <div className="info">
            <p className="text-big">Coupon di Primavera!</p>
            <div className="discount-code">
              <p className="code">Sconto-10</p>
            </div>
          </div>
          <figure className="hero-coupon-img">
            <img src="graphics/hero-coupon.png" alt="" />
          </figure>
        </div> */}
        <HeroDiscount/>

        {/* nuove hero */}
        {/* <Hero /> */}
      </section>
      {/* i più venduti */}
      <section id="home-mostselled" className="carousel-section">
        {mostSelled ? <Carousel array={mostSelled} topic="bestsellers" /> : <p>Most Selled non caricati</p>}
        {/* <Carousel array={mostSelled} /> */}
      </section>
      {/* categoria */}
      <section id="home-category" className="carousel-section">
        {categoryProducts ? <Carousel array={categoryProducts} topic="casual" /> : <p>Categoria non caricata</p>}
        {/* <Carousel array={mostSelled} /> */}
      </section>
    </main>
  );
}
