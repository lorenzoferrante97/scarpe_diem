import HeroCarouselSlide from './HeroCarouselSlide';
import React, { useState, useEffect, useRef } from 'react';

export default function HeroCarousel({ autoSlideInterval }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideCount = 2;
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchMoveX = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (autoSlideInterval) {
      timerRef.current = setInterval(nextSlide, autoSlideInterval);
    }
    return () => clearInterval(timerRef.current);
  }, [autoSlideInterval]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchMoveX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current && touchMoveX.current) {
      const diffX = touchStartX.current - touchMoveX.current;
      if (diffX > 50) {
        nextSlide();
      } else if (diffX < -50) {
        prevSlide();
      }
      touchStartX.current = null;
      touchMoveX.current = null;
    }
  };

  return (
    <div className="hero-slider">
      <div className="slider-container" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div className="slide-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          <HeroCarouselSlide />
          <HeroCarouselSlide />
        </div>
      </div>

      {/* <button onClick={prevSlide}>Prev</button> */}
      <div className="slider-dots-box">
        {Array.from({ length: slideCount }).map((_, index) => (
          <div className="dot" key={index} onClick={() => goToSlide(index)}></div>
        ))}
      </div>
      {/* <button onClick={nextSlide}>Next</button> */}
    </div>
  );
}
