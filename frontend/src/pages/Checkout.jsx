import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import FormError from "../components/FormError";
import { Navigate, useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const { cart, setCartToLocal } = useGlobalContext();
  const [isFattSameOfSped, setIsFattSameOfSped] = useState(false);
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

  // ----------------------------------------------------
  // ----------------------------------------------------
  // ----------------------------------------------------
  // VALIDAZIONE FORM

  const [errorName, setErrorName] = useState("");
  const [errorSurname, setErrorSurname] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorTel, setErrorTel] = useState("");
  const [errorIndirizzosped, setErrorIndirizzosped] = useState("");
  const [errorCity, setErrorCity] = useState("");
  const [errorCap, setErrorCap] = useState("");
  const [errorIndirizzofatt, setErrorIndirizzofatt] = useState("");
  const [errorCityfatt, setErrorCityfatt] = useState("");
  const [errorCapfatt, setErrorCapfatt] = useState("");
  const [errorForm, setErrorForm] = useState("");

  //fare
  const [errorCoupon, setErrorCoupon] = useState("");

  // reset errori

  switch (name) {
    case "name":
      setErrorName("");
      break;
    case "surname":
      setErrorSurname("");
      break;
    case "email":
      setErrorEmail("");
      break;
    case "tel":
      setErrorTel("");
      break;
    case "indirizzosped":
      setErrorIndirizzosped("");
      break;
    case "city":
      setErrorCity("");
      break;
    case "cap":
      setErrorCap("");
      break;
    case "indirizzofatt":
      setErrorIndirizzofatt("");
      break;
    case "cityfatt":
      setErrorCityfatt("");
      break;
    case "capfatt":
      setErrorCapfatt("");
      break;
    case "coupon":
      setErrorCoupon("");
      break;
    default:
      break;
  }

  let isValid = true;

  // funzione di validazione campi
  const validateForm = () => {
    // validazione nome
    if (!formData.name.trim()) {
      setErrorName("Il nome è obbligatorio");
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      setErrorName("Il nome deve contenere solo lettere e spazi");
      isValid = false;
    }

    // validazione cognome
    if (!formData.surname.trim()) {
      setErrorSurname("Il cognome è obbligatorio");
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.surname)) {
      setErrorSurname("Il cognome deve contenere solo lettere e spazi");
      isValid = false;
    }

    // validazione email
    if (!formData.email.trim()) {
      setErrorEmail("L'email è obbligatoria");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorEmail("L'email non è valida");
      isValid = false;
    }

    // validazione tel
    if (!formData.tel.trim()) {
      setErrorTel("Il telefono è obbligatorio");
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.tel)) {
      setErrorTel("Il telefono deve contenere 10 cifre");
      isValid = false;
    }

    // validazione indirizzo
    if (!formData.indirizzosped.trim()) {
      setErrorIndirizzosped("L'indirizzo di spedizione è obbligatorio");
      isValid = false;
    }

    // validazione città
    if (!formData.city.trim()) {
      setErrorCity("La città è obbligatoria");
      isValid = false;
    }

    // validazione cap
    if (!formData.cap.trim()) {
      setErrorCap("Il CAP è obbligatorio");
      isValid = false;
    } else if (!/^\d{5}$/.test(formData.cap)) {
      setErrorCap("Il CAP deve contenere 5 cifre");
      isValid = false;
    }

    // validazione fatturazione
    if (!isFattSameOfSped) {
      if (!formData.indirizzofatt.trim()) {
        setErrorIndirizzofatt("L'indirizzo di fatturazione è obbligatorio");
        isValid = false;
      }
      if (!formData.cityfatt.trim()) {
        setErrorCityfatt("La città di fatturazione è obbligatoria");
        isValid = false;
      }
      if (!formData.capfatt.trim()) {
        setErrorCapfatt("Il CAP di fatturazione è obbligatorio");
        isValid = false;
      } else if (!/^\d{5}$/.test(formData.capfatt)) {
        setErrorCapfatt("Il CAP di fatturazione deve contenere 5 cifre");
        isValid = false;
      }
    }

    // validateForm();

    // if (!isValid) {
    //   setErrorForm('Errore di compilazione, controlla i campi inseriti');
    // }
  };

  // ----------------------------------------------------
  // ----------------------------------------------------
  // ----------------------------------------------------

  useEffect(() => {
    setCartToLocal();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateForm();

    if (!isValid) {
      setErrorForm("Errore di compilazione, controlla i campi inseriti");
    }

    if (!isValid) {
      return; // Blocca l'invio del form se la validazione fallisce
    } else {
      setIsLoading(true);
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
        coupon: formData.coupon ? formData.coupon : null, // Cambiato da coupon_id a coupon
        carrello: cart.map((item) => ({
          id: item.id,
          size_id: item.size_id,
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
          navigate("/checkout/order-completed");
          console.log("Risultato:", data);
        })
        .catch((error) => {
          console.error("Errore nel checkout:", error.message);
          setErrorForm(`Errore nel checkout: ${error.message}`);
        })
        .finally(() => {
          // Nascondi il loader quando la richiesta è completata (successo o errore)
          setIsLoading(false);
        });

      console.log("Dati inviati al backend:", dataToSend);
    }
  };

  const handleCheckboxChange = (event) => {
    setIsFattSameOfSped(event.target.checked);
  };

  // totale ordine per riepilogo
  let orderTotal = 0;

  return (
    <>
      <div className={`loader-container ${isLoading ? "" : "hidden"}`}>
        controllo ordine...
        <span className="loader"></span>
      </div>{" "}
      <div className="loader-container hidden">
        <span class="loader"></span>
      </div>
      <main className="main-checkout">
        <section className="checkout-header">
          <h1 className="h1">Completa Ordine</h1>
        </section>
        {/* riepilogo ordine */}
        <section className="checkout-form-section riepilogo-section">
          <h2 className="h2">Riepilogo Ordine</h2>
          {/* elenco prodotti carrello minimal */}
          <div className="riepilogo-products-box">
            {cart?.map((product, i) => {
              const { id, name, selectedQuantity, selectedSize, price } =
                product;
              const productTotal = price * selectedQuantity;
              orderTotal = orderTotal + productTotal;
              Number(orderTotal.toFixed(2));

              return (
                <>
                  <div key={i} className="riepilogo-product-info-box">
                    <span className="text-big">{name}</span>
                    <div className="riepilogo-product-info">
                      <span>Taglia</span>
                      <span className="">{selectedSize}</span>
                    </div>
                    <div className="riepilogo-product-info">
                      <span>Qt.</span>
                      <span className="">x{selectedQuantity}</span>
                    </div>
                    <div className="riepilogo-product-info">
                      <span>Tot. Parziale</span>
                      <span className="text-big">&euro;{productTotal}</span>
                    </div>
                    <hr />
                  </div>
                </>
              );
            })}
          </div>
          <div className="riepilogo-products-box total-box">
            <span className="text-big">Totale ordine</span>
            <span className="text-big total-price">&euro;{orderTotal}</span>
          </div>
          {/* spedizione gratuita */}
          <div
            className={
              orderTotal < 250.0
                ? "riepilogo-products-box free hidden"
                : "riepilogo-products-box free"
            }
          >
            <p className="free-text">
              Il tuo ordine è idoneo per la spedizione gratuita!
            </p>
          </div>
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
                  <div>
                    <label htmlFor="name">Nome</label>
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Franco"
                    className="checkout-form-input"
                    onChange={handleInputChange}
                  />
                  {errorName ? <FormError errorText={errorName} /> : null}
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
                  {errorSurname ? <FormError errorText={errorSurname} /> : null}
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
                  {errorEmail ? <FormError errorText={errorEmail} /> : null}
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
                  {errorTel ? <FormError errorText={errorTel} /> : null}
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
                    {errorIndirizzosped ? (
                      <FormError errorText={errorIndirizzosped} />
                    ) : null}
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
                    {errorCity ? <FormError errorText={errorCity} /> : null}
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
                    {errorCap ? <FormError errorText={errorCap} /> : null}
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
                    {errorIndirizzofatt ? (
                      <FormError errorText={errorIndirizzofatt} />
                    ) : null}
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
                    {errorCityfatt ? (
                      <FormError errorText={errorCityfatt} />
                    ) : null}
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
                    {errorCapfatt ? (
                      <FormError errorText={errorCapfatt} />
                    ) : null}
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
                <button className="btn btn-accent">Completa ordine</button>
                {errorForm ? <FormError errorText={errorForm} /> : null}
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
