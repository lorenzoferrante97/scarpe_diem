import { useEffect } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
export default function CouponBanner() {
  const { handleCouponActive, couponActive } = useGlobalContext();
  useEffect(() => {
    handleCouponActive();
  }, []);
  return (
    <div className="coupon-box">
      <p>
        Affrettati! Il codice <span className="coupon">{couponActive.code}</span> è valido solo per un periodo limitato!
      </p>
    </div>
  );
}
