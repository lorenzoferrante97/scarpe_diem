import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function CatalogPage() {
  const [prodotti, setProdotti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/products/")
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento dei prodotti");
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
    <div
      className="catalog-container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1.5rem",
        padding: "2rem",
      }}
    >
      {prodotti.map((prodotto, index) => (
        <div
          key={index}
          style={{
            flex: "0 1 calc(33.333% - 1rem)",
            boxSizing: "border-box",
          }}
        >
          <Card content={prodotto} />
        </div>
      ))}
    </div>
  );
}