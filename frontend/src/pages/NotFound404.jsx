import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function NotFound404() {
  return (
    <>
      <main>
        <section className="notfound-section">
          <div className="animation-404">
            <DotLottieReact src="https://lottie.host/f38ea552-20bd-4331-afc0-065c97b46fe1/Ex55FYN84h.lottie" loop autoplay />
          </div>
          {/* <span className="notfound-number">404</span> */}
          <p>Il contenuto che hai cercato non esiste</p>
        </section>
      </main>
    </>
  );
}
