import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function Checkout() {
  const { cart,setCartToLocal } = useGlobalContext();
  const [isFattSameOfSped, setIsFattSameOfSped] = useState(false);
  console.log(cart)
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    tel: "",
    indirizzosped: "",
    city: "",
    cap: "",
    indirizzofatt: "",
    cityfatt: "",
    capfatt: "",
    coupon: "",
  });
useEffect(() => {
  setCartToLocal();
}, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Preparo i dati da inviare
    const dataToSend = {
  nome: formData.name,
  cognome: formData.surname,
  email: formData.email,
  telefono: formData.tel,
  indirizzo_spedizione: `${formData.indirizzosped}, ${formData.city}, ${formData.cap}`,
  indirizzo_pagamento: isFattSameOfSped
    ? `${formData.indirizzosped}, ${formData.city}, ${formData.cap}`
    : `${formData.indirizzofatt}, ${formData.cityfatt}, ${formData.capfatt}`,
  coupon_id: formData.coupon ? formData.coupon : null, // Verifica se hai il coupon ID
  carrello: cart.map((item) => ({
    id: item.id,
    size_id: item.size_id, // Usa il size_id memorizzato durante l'aggiunta al carrello
    prezzo: item.price,
    quantita: item.selectedQuantity,
  })),
};

    // Effettua la richiesta al backend
    fetch("http://localhost:3000/products/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.error);
          });
        }
        return response.json();
      })
      .then((data) => {
        alert("Ordine completato con successo!");
        console.log("Risultato:", data);
      })
      .catch((error) => {
        console.error("Errore nel checkout:", error.message);
        alert(`Errore nel checkout: ${error.message}`);
      });
          console.log("Dati inviati al backend:", dataToSend);

  };

  const handleCheckboxChange = (event) => {
    setIsFattSameOfSped(event.target.checked);
  };
  return (
    <>
      <main>
        <section className="checkout-header">
          <h1 className="h1">Checkout</h1>
        </section>
        <section className="checkout-form-section">
          {/* form */}
          <div>
            <form className="checkout-form" onSubmit={handleSubmit}>
              {/* info spedizione -> mail, num tel, indirizzo sped, indirizzo fatt, coupon id */}
              <div className="checkout-form-container">
                <h2 className="h2">Dettagli spedizione</h2>
                {/* nome */}
                <div className="checkout-form-box">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Franco"
                    className="checkout-form-input"
                    onChange={handleInputChange}
                  />
                </div>
                {/* cognome */}
                <div className="checkout-form-box">
                  <label htmlFor="surname">Cognome</label>
                  <input
                    type="text"
                    name="surname"
                    placeholder="Cello"
                    className="checkout-form-input"
                    onChange={handleInputChange}
                  />
                </div>
                {/* mail */}
                <div className="checkout-form-box">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="francocello@gmail.com"
                    className="checkout-form-input"
                    onChange={handleInputChange}
                  />
                </div>
                {/* tel */}
                <div className="checkout-form-box">
                  <label htmlFor="tel">Telefono</label>
                  <input
                    type="tel"
                    name="tel"
                    placeholder="3214567890"
                    className="checkout-form-input"
                    onChange={handleInputChange}
                  />
                </div>
                {/* SPEDIZIONE */}
                <div className="checkout-form-box address-container">
                  {/* indirizzo spedizione */}
                  <div className="checkout-form-box">
                    <label htmlFor="indirizzosped">Indirizzo Spedizione</label>
                    <input
                      type="text"
                      name="indirizzosped"
                      placeholder="Via germania, 84"
                      className="checkout-form-input"
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* città */}
                  <div className="checkout-form-box">
                    <label htmlFor="city">Città</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Roma"
                      className="checkout-form-input"
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* cap */}
                  <div className="checkout-form-box">
                    <label htmlFor="cap">Cap</label>
                    <input
                      type="text"
                      name="cap"
                      placeholder="00012"
                      className="checkout-form-input"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* checkbox fatturazione */}
                <div className="checkout-form-box checkbox-box">
                  <div className="checkbox-area">
                    <input
                      type="checkbox"
                      name="checkfatt"
                      className="checkout-form-input checkbox"
                      checked={isFattSameOfSped}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  <label htmlFor="checkfatt">
                    L'indirizzo di fatturazione è lo stesso della spedizione
                  </label>
                </div>

                {/* FATTURAZIONE */}
                <div
                  className={`checkout-form-box address-container ${
                    isFattSameOfSped ? "hidden" : ""
                  }`}
                >
                  {/* indirizzo fatturazione */}
                  <div className="checkout-form-box">
                    <label htmlFor="indirizzofatt">
                      Indirizzo Fatturazione
                    </label>
                    <input
                      type="text"
                      name="indirizzofatt"
                      placeholder="Via germania, 84"
                      className="checkout-form-input"
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* città */}
                  <div className="checkout-form-box">
                    <label htmlFor="cityfatt">Città</label>
                    <input
                      type="text"
                      name="cityfatt"
                      placeholder="Roma"
                      className="checkout-form-input"
                    />
                  </div>
                  {/* cap */}
                  <div className="checkout-form-box">
                    <label htmlFor="capfatt">Cap</label>
                    <input
                      type="text"
                      name="capfatt"
                      placeholder="00012"
                      className="checkout-form-input"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                {/* coupon */}
                <div className="checkout-form-box coupon-container">
                  <label htmlFor="coupon">Inserisci Coupon</label>
                  <input
                    type="text"
                    name="coupon"
                    placeholder="SCONTO-10"
                    className="checkout-form-input"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {/* actions */}
              <div className="checkout-form-box">
                <button className="btn btn-accent">Completa pagamento</button>
              </div>
            </form>
          </div>
          {/* riepilogo ordine */}
          <div></div>
        </section>
      </main>
    </>
  );
}
