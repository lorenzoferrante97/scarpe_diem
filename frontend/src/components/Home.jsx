import HeroCarousel from './HeroCarousel';

export default function Home() {
  return (
    <main>
      <section id="hero-section" className="hero">
        <HeroCarousel autoSlideInterval={7000} />
        {/* hero coupon */}
        <div></div>
      </section>
    </main>
  );
}
