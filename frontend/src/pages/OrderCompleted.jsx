import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';

export default function NotFound404() {
  const { cleanCart } = useGlobalContext();

  useEffect(() => cleanCart(), []);

  return (
    <>
      <main>
        <section className="notfound-section">
          <div className="animation-404">
            <DotLottieReact src="https://lottie.host/0d4498a9-32a0-4dba-9051-9c125e21f1c0/Wp644B14iV.lottie" loop autoplay />
          </div>
          {/* <span className="notfound-number">404</span> */}
          <p className="thanks-text">Grazie</p>
          <p className="text-big">per aver completato il tuo ordine.</p>
        </section>
      </main>
    </>
  );
}
