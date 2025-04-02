export default function Checkout() {
  return (
    <>
      <main>
        <section>
          <h1>Checkout</h1>
        </section>
        <section>
          {/* form */}
          <div>
            <form>
              {/* info spedizione -> mail, num tel, indirizzo sped, indirizzo fatt, coupon id */}
              <div>
                <p>Dettagli spedizione</p>
                {/* nome */}
                <div>
                  <label htmlFor="name">Nome</label>
                  <input type="text" name="name" placeholder="Franco" />
                </div>
                {/* cognome */}
                <div>
                  <label htmlFor="surname">Cognome</label>
                  <input type="text" name="surname" placeholder="Cello" />
                </div>
                {/* mail */}
                <div>
                  <label htmlFor="email">Cognome</label>
                  <input type="email" name="email" placeholder="francocello@gmail.com" />
                </div>
                {/* tel */}
                <div>
                  <label htmlFor="tel">Cognome</label>
                  <input type="tel" name="tel" placeholder="francocello@gmail.com" />
                </div>
                {/* indirizzo spedizione */}
                <div>
                  <label htmlFor="indirizzosped">Indirizzo</label>
                  <input type="text" name="indirizzosped" placeholder="Via germania, 84" />
                </div>
                {/* città */}
                <div>
                  <label htmlFor="city">Indirizzo</label>
                  <input type="text" name="city" placeholder="Roma" />
                </div>
                {/* cap */}
                <div>
                  <label htmlFor="cap">Indirizzo</label>
                  <input type="text" name="cap" placeholder="00012" />
                </div>
                {/* coupon */}
                <div>
                  <label htmlFor="coupon">Inserisci Coupon</label>
                  <input type="text" name="coupon" placeholder="SCONTO-10" />
                </div>
              </div>
              {/* actions */}
              <div>
                <button>Completa pagamento</button>
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
