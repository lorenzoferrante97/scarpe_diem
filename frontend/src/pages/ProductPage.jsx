export default function ProductPage() {
    return (
      <main>
        {/* Sezione prodotto */}
        <section className="product-section">
          <figure className="product-image">
            <img
              src="https://www.tennisnuts.com/images/product/full/Nike-LunarGlide-6-Womens-Running-Shoe-654434_603_A_PREM.jpg"
              alt="Air Max 07"
            />
          </figure>
  
          <div className="product-info">
            <div className="product-details">
              <span className="badge badge-text">Basket</span>
              <h1 className="h1">Air Max 07</h1>
              <p>
                Le Nike Air Max 07 combinano stile e comfort in un design iconico. Con una tomaia in mesh traspirante e una suola con l'innovativa tecnologia Air Max, queste scarpe offrono una calzata leggera e un'ammortizzazione superiore per tutta la giornata. Perfette per l'uso quotidiano o per un look sportivo, le Air Max 07 si adattano facilmente a qualsiasi outfit, garantendo un tocco di eleganza e performance. Disponibili in una varietà di colori, queste scarpe sono ideali per chi cerca stile e comfort in un unico prodotto.
              </p>
              <p className="product-price">€ 129.00</p>
            </div>
  
            <div className="product-actions-box">
              <label className="text-big" htmlFor="size">
                Taglia
              </label>
              <select id="size">
                <option>Seleziona una taglia</option>
              </select>
  
              {/* mancano le icone */}
              <div className="card-actions-box buttons-container">
                <button className="btn-accent">Aggiungi al carrello</button>
                <button className="btn-sec">Salva nella wishlist</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }