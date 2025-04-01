import Card from '../Card';

export default function CarouselSlide({ object }) {
  return (
    <>
      {/* slide */}
      <div className="carousel-slide">
        {/* cards */}
        <div className="carousel-card-container">
          <Card content={object} />
        </div>
      </div>
    </>
  );
}
