import { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function CatalogPage() {
  const [prodotti, setProdotti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/products/')
      .then((res) => {
        if (!res.ok) throw new Error('Errore nel caricamento dei prodotti');
        return res.json();
      })
      .then((data) => {
        setProdotti(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrore(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Caricamento prodotti...</p>;
  if (errore) return <p>Errore: {errore}</p>;

  return (
    <main>
      <section className="catalog-header">
        <h1 className="h1">Catalogo</h1>
      </section>
      <div className="catalog-container">
        {prodotti.map((prodotto, index) => (
          <div key={index} className="catalog-item">
            <Card content={prodotto} />
          </div>
        ))}
      </div>
    </main>
  );
}
