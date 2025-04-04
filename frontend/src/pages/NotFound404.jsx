import { useEffect } from 'react';

export default function NotFound404() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      <main>
        <section className="notfound-section">
          <span className="notfound-number">404</span>
          <p>Il contenuto che hai cercato non esiste</p>
        </section>
      </main>
    </>
  );
}
