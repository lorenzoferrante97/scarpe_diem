import { NavLink, Link } from 'react-router-dom';
import { Basket } from '@phosphor-icons/react';
import { Heart } from '@phosphor-icons/react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import CouponBanner from './CouponBanner';
import { useGlobalContext } from '../contexts/GlobalContext';

export default function Header() {
  const { cart, wishlist } = useGlobalContext();

  return (
    <section className="header-container">
      <CouponBanner />
      <header>
        <div className="menu-box">
          <nav>
            <NavLink to={'/'} className="nav-item">
              Home
            </NavLink>
            <NavLink to={'/catalog'} className="nav-item">
              Catalogo
            </NavLink>
          </nav>
        </div>
        <div className="logo-box">
          <Link to={'/'} className="logo">
            ScarpeDiem
          </Link>
        </div>
        <div className="icons-box">
          <nav>
            {/* cart + wishlist */}
            <div className="header-btn-container">
              <NavLink to={'/cart'} className="header-btn">
                <Basket size={24} color={location.pathname === '/cart' ? '#a92e1b' : '#212121'} weight="duotone" />
                <span className={`cart-icon-total ${cart?.length == 0 && 'hidden'}`}>{cart?.length}</span>
              </NavLink>
              <NavLink to={'/wishlist'} className="header-btn">
                <Heart size={24} color={location.pathname === '/wishlist' ? '#a92e1b' : '#212121'} weight="duotone" />
                <span className={`cart-icon-total ${wishlist?.length == 0 && 'hidden'}`}>{wishlist?.length}</span>
              </NavLink>
              <NavLink to={'/search'} className="header-btn">
                <MagnifyingGlass size={24} color={location.pathname === '/search' ? '#a92e1b' : '#212121'} weight="duotone" />
              </NavLink>
            </div>
          </nav>
        </div>
      </header>
    </section>
  );
}
