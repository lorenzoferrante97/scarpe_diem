import { useEffect, useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import FormError from '../components/FormError';

export default function Checkout() {
  const { cart, setCartToLocal } = useGlobalContext();
  const [isFattSameOfSped, setIsFattSameOfSped] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    tel: '',
    indirizzosped: '',
    city: '',
    cap: '',
    indirizzofatt: '',
    cityfatt: '',
    capfatt: '',
    coupon: '',
  });

  // ----------------------------------------------------
  // ----------------------------------------------------
  // ----------------------------------------------------
  // VALIDAZIONE FORM

  const [errorName, setErrorName] = useState('');
  const [errorSurname, setErrorSurname] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorTel, setErrorTel] = useState('');
  const [errorIndirizzosped, setErrorIndirizzosped] = useState('');
  const [errorCity, setErrorCity] = useState('');
  const [errorCap, setErrorCap] = useState('');
  const [errorIndirizzofatt, setErrorIndirizzofatt] = useState('');
  const [errorCityfatt, setErrorCityfatt] = useState('');
  const [errorCapfatt, setErrorCapfatt] = useState('');
  const [errorCoupon, setErrorCoupon] = useState('');

  // reset errori

  switch (name) {
    case 'name':
      setErrorName('');
      break;
    case 'surname':
      setErrorSurname('');
      break;
    case 'email':
      setErrorEmail('');
      break;
    case 'tel':
      setErrorTel('');
      break;
    case 'indirizzosped':
      setErrorIndirizzosped('');
      break;
    case 'city':
      setErrorCity('');
      break;
    case 'cap':
      setErrorCap('');
      break;
    case 'indirizzofatt':
      setErrorIndirizzofatt('');
      break;
    case 'cityfatt':
      setErrorCityfatt('');
      break;
    case 'capfatt':
      setErrorCapfatt('');
      break;
    case 'coupon':
      setErrorCoupon('');
      break;
    default:
      break;
  }

  // funzione di validazione campi
  const validateForm = () => {
    let isValid = true;

    // validazione nome
    if (!formData.name.trim()) {
      setErrorName('Il nome è obbligatorio');
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      setErrorName('Il nome deve contenere solo lettere e spazi');
      isValid = false;
    }

    // validazione cognome
    if (!formData.surname.trim()) {
      setErrorSurname('Il cognome è obbligatorio');
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.surname)) {
      setErrorSurname('Il cognome deve contenere solo lettere e spazi');
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
      setErrorTel('Il telefono è obbligatorio');
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.tel)) {
      setErrorTel('Il telefono deve contenere 10 cifre');
      isValid = false;
    }

    // validazione indirizzo
    if (!formData.indirizzosped.trim()) {
      setErrorIndirizzosped("L'indirizzo di spedizione è obbligatorio");
      isValid = false;
    }

    // validazione città
    if (!formData.city.trim()) {
      setErrorCity('La città è obbligatoria');
      isValid = false;
    }

    // validazione cap
    if (!formData.cap.trim()) {
      setErrorCap('Il CAP è obbligatorio');
      isValid = false;
    } else if (!/^\d{5}$/.test(formData.cap)) {
      setErrorCap('Il CAP deve contenere 5 cifre');
      isValid = false;
    }

    // validazione fatturazione
    if (!isFattSameOfSped) {
      if (!formData.indirizzofatt.trim()) {
        setErrorIndirizzofatt("L'indirizzo di fatturazione è obbligatorio");
        isValid = false;
      }
      if (!formData.cityfatt.trim()) {
        setErrorCityfatt('La città di fatturazione è obbligatoria');
        isValid = false;
      }
      if (!formData.capfatt.trim()) {
        setErrorCapfatt('Il CAP di fatturazione è obbligatorio');
        isValid = false;
      } else if (!/^\d{5}$/.test(formData.capfatt)) {
        setErrorCapfatt('Il CAP di fatturazione deve contenere 5 cifre');
        isValid = false;
      }
    }
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

    if (!validateForm()) {
      return; // Blocca l'invio del form se la validazione fallisce
    } else {
      // Preparo i dati da inviare
      const dataToSend = {
        nome: formData.name,
        cognome: formData.surname,
        email: formData.email,
        telefono: formData.tel,
        indirizzo_spedizione: `${formData.indirizzosped}, ${formData.city}, ${formData.cap}`,
        indirizzo_pagamento: isFattSameOfSped ? `${formData.indirizzosped}, ${formData.city}, ${formData.cap}` : `${formData.indirizzofatt}, ${formData.cityfatt}, ${formData.capfatt}`,
        coupon: formData.coupon ? formData.coupon : null, // Cambiato da coupon_id a coupon
        carrello: cart.map((item) => ({
          id: item.id,
          size_id: item.size_id,
          prezzo: item.price,
          quantita: item.selectedQuantity,
        })),
      };
      // Effettua la richiesta al backend
      fetch('http://localhost:3000/products/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
          alert('Ordine completato con successo!');
          console.log('Risultato:', data);
        })
        .catch((error) => {
          console.error('Errore nel checkout:', error.message);
          alert(`Errore nel checkout: ${error.message}`);
        });
      console.log('Dati inviati al backend:', dataToSend);
    }
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
                  <div>
                    <label htmlFor="name">Nome</label>
                    <span>*obbligatorio</span>
                  </div>
                  <input type="text" name="name" placeholder="Franco" className="checkout-form-input" onChange={handleInputChange} />
                  {errorName && <FormError errorText={errorName} />}
                </div>
                {/* cognome */}
                <div className="checkout-form-box">
                  <label htmlFor="surname">Cognome</label>
                  <input type="text" name="surname" placeholder="Cello" className="checkout-form-input" onChange={handleInputChange} />
                </div>
                {/* mail */}
                <div className="checkout-form-box">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" placeholder="francocello@gmail.com" className="checkout-form-input" onChange={handleInputChange} />
                </div>
                {/* tel */}
                <div className="checkout-form-box">
                  <label htmlFor="tel">Telefono</label>
                  <input type="tel" name="tel" placeholder="3214567890" className="checkout-form-input" onChange={handleInputChange} />
                </div>
                {/* SPEDIZIONE */}
                <div className="checkout-form-box address-container">
                  {/* indirizzo spedizione */}
                  <div className="checkout-form-box">
                    <label htmlFor="indirizzosped">Indirizzo Spedizione</label>
                    <input type="text" name="indirizzosped" placeholder="Via germania, 84" className="checkout-form-input" onChange={handleInputChange} />
                  </div>
                  {/* città */}
                  <div className="checkout-form-box">
                    <label htmlFor="city">Città</label>
                    <input type="text" name="city" placeholder="Roma" className="checkout-form-input" onChange={handleInputChange} />
                  </div>
                  {/* cap */}
                  <div className="checkout-form-box">
                    <label htmlFor="cap">Cap</label>
                    <input type="text" name="cap" placeholder="00012" className="checkout-form-input" onChange={handleInputChange} />
                  </div>
                </div>

                {/* checkbox fatturazione */}
                <div className="checkout-form-box checkbox-box">
                  <div className="checkbox-area">
                    <input type="checkbox" name="checkfatt" className="checkout-form-input checkbox" checked={isFattSameOfSped} onChange={handleCheckboxChange} />
                  </div>
                  <label htmlFor="checkfatt">L'indirizzo di fatturazione è lo stesso della spedizione</label>
                </div>

                {/* FATTURAZIONE */}
                <div className={`checkout-form-box address-container ${isFattSameOfSped ? 'hidden' : ''}`}>
                  {/* indirizzo fatturazione */}
                  <div className="checkout-form-box">
                    <label htmlFor="indirizzofatt">Indirizzo Fatturazione</label>
                    <input type="text" name="indirizzofatt" placeholder="Via germania, 84" className="checkout-form-input" onChange={handleInputChange} />
                  </div>
                  {/* città */}
                  <div className="checkout-form-box">
                    <label htmlFor="cityfatt">Città</label>
                    <input type="text" name="cityfatt" placeholder="Roma" className="checkout-form-input" />
                  </div>
                  {/* cap */}
                  <div className="checkout-form-box">
                    <label htmlFor="capfatt">Cap</label>
                    <input type="text" name="capfatt" placeholder="00012" className="checkout-form-input" onChange={handleInputChange} />
                  </div>
                </div>
                {/* coupon */}
                <div className="checkout-form-box coupon-container">
                  <label htmlFor="coupon">Inserisci Coupon</label>
                  <input type="text" name="coupon" placeholder="SCONTO-10" className="checkout-form-input" onChange={handleInputChange} />
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
