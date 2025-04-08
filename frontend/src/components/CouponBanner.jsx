
import { useEffect } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
export default function CouponBanner() {
    const { handleCouponActive,couponActive } = useGlobalContext();
    useEffect(() => {
        handleCouponActive();
    }, []);
  return (
    <div className="coupon-box">
          <p>Affrettati! Il codice <strong className='coupon'>{couponActive.code}</strong> è valido solo per un periodo limitato!</p>
    </div>
  );
}