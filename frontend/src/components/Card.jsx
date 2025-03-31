export default function Card() {
  return (
    <>
      <div className="card carousel-card">
        <figure className="card-image">
          <img src="https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </figure>
        <div className="card-info-box">
          <h3 className="card-title">Card Title</h3>
          <span className="card-price">Card Price</span>
        </div>
        <div className="card-actions-box">
          <button className="card-action-cart">
            <span style={{ color: '#ffffff' }}>A</span>
          </button>
          <button className="card-action-wishlist">
            <span style={{ color: '#000000' }}>B</span>
          </button>
        </div>
      </div>
    </>
  );
}
