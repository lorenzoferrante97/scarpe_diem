import Card from '../Card';

export default function CarouselSlide({ key, object }) {
  console.log('object', object);
  return (
    <>
      {/* slide */}
      <div className="carousel-slide" key={key}>
        {/* cards */}
        <div className="carousel-card-container">
          <Card content={object} />
        </div>
      </div>
    </>
  );
}
