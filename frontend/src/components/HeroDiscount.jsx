import { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function HeroDiscount() {
    const { handleCouponActive, couponActive } = useGlobalContext();
    // lo uso per sceglire il testo che deve apparire quando clicco sul btn
    const [copySuccess, setCopySuccess] = useState(false); 

    useEffect(() => {
        handleCouponActive();
    }, []);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(couponActive.code)
            .then(() => {
                setCopySuccess(true); 
                setTimeout(() => {
                    setCopySuccess(false); 
                }, 2000);
            })
            .catch((err) => {
                console.error("Impossibile copiare il testo: ", err);
                setCopySuccess(false); 
            });
    };

    return (
        <div className="hero-discount-box">
            <div className="info">
                <p className="text-big">Coupon di Primavera!</p>
                <div className="discount-code">
                    <p className="code">{couponActive.code}</p>
                    <button
                        className="btn btn-accent w-fit"
                        onClick={handleCopyToClipboard}
                    >
                        {copySuccess ? "Copiato!" : "Copia"}
                    </button>
                </div>
            </div>
            <figure className="hero-coupon-img">
                <img src="graphics/hero-coupon.png" alt="" />
            </figure>
        </div>
    );
}