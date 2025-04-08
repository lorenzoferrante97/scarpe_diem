import { useEffect, useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import { Clipboard } from '@phosphor-icons/react';

export default function HeroDiscount() {
  const { handleCouponActive, couponActive } = useGlobalContext();
  // lo uso per sceglire il testo che deve apparire quando clicco sul btn
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    handleCouponActive();
  }, []);

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(couponActive.code)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      })
      .catch((err) => {
        console.error('Impossibile copiare il testo: ', err);
        setCopySuccess(false);
      });
  };

  return (
    <div className="hero-discount-box">
      <div className="info">
        <p className="text-big">Risparmia con il coupon del momento</p>
        <div className="discount-code">
          <button className="code" onClick={handleCopyToClipboard}>
            <Clipboard size={24} weight="duotone" />
            {copySuccess ? 'Copiato!' : couponActive.code}
          </button>
          {/* <button className="btn btn-accent w-fit" onClick={handleCopyToClipboard}>
            {copySuccess ? 'Copiato!' : 'Copia'}
          </button> */}
        </div>
      </div>
      <figure className="hero-coupon-img">
        <img src="graphics/hero-coupon.png" alt="" />
      </figure>
    </div>
  );
}
