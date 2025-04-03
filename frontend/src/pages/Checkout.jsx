import { useState } from 'react';

export default function Checkout() {
  const [isFattSameOfSped, setIsFattSameOfSped] = useState(false);

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
            <form className="checkout-form">
              {/* info spedizione -> mail, num tel, indirizzo sped, indirizzo fatt, coupon id */}
              <div className="checkout-form-container">
                <h2 className="h2">Dettagli spedizione</h2>
                {/* nome */}
                <div className="checkout-form-box">
                  <label htmlFor="name">Nome</label>
                  <input type="text" name="name" placeholder="Franco" className="checkout-form-input" />
                </div>
                {/* cognome */}
                <div className="checkout-form-box">
                  <label htmlFor="surname">Cognome</label>
                  <input type="text" name="surname" placeholder="Cello" className="checkout-form-input" />
                </div>
                {/* mail */}
                <div className="checkout-form-box">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" placeholder="francocello@gmail.com" className="checkout-form-input" />
                </div>
                {/* tel */}
                <div className="checkout-form-box">
                  <label htmlFor="tel">Telefono</label>
                  <input type="tel" name="tel" placeholder="3214567890" className="checkout-form-input" />
                </div>
                {/* SPEDIZIONE */}
                <div className="checkout-form-box address-container">
                  {/* indirizzo spedizione */}
                  <div className="checkout-form-box">
                    <label htmlFor="indirizzosped">Indirizzo Spedizione</label>
                    <input type="text" name="indirizzosped" placeholder="Via germania, 84" className="checkout-form-input" />
                  </div>
                  {/* città */}
                  <div className="checkout-form-box">
                    <label htmlFor="city">Città</label>
                    <input type="text" name="city" placeholder="Roma" className="checkout-form-input" />
                  </div>
                  {/* cap */}
                  <div className="checkout-form-box">
                    <label htmlFor="cap">Cap</label>
                    <input type="text" name="cap" placeholder="00012" className="checkout-form-input" />
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
                    <input type="text" name="indirizzofatt" placeholder="Via germania, 84" className="checkout-form-input" />
                  </div>
                  {/* città */}
                  <div className="checkout-form-box">
                    <label htmlFor="cityfatt">Città</label>
                    <input type="text" name="cityfatt" placeholder="Roma" className="checkout-form-input" />
                  </div>
                  {/* cap */}
                  <div className="checkout-form-box">
                    <label htmlFor="capfatt">Cap</label>
                    <input type="text" name="capfatt" placeholder="00012" className="checkout-form-input" />
                  </div>
                </div>
                {/* coupon */}
                <div className="checkout-form-box coupon-container">
                  <label htmlFor="coupon">Inserisci Coupon</label>
                  <input type="text" name="coupon" placeholder="SCONTO-10" className="checkout-form-input" />
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
