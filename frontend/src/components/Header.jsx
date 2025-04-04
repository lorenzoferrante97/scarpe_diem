import { NavLink, Link } from 'react-router-dom';
import { Basket } from '@phosphor-icons/react';
import { Heart } from '@phosphor-icons/react';
import { MagnifyingGlass } from '@phosphor-icons/react';

export default function Header() {
  return (
    <section className="header-container">
      <div className="coupon-box">
        <p>Coupon SCONTO-10</p>
      </div>
      <header>
        <div className="menu-box">
          <nav>
            <NavLink to={'/'} className="nav-item">
              Home
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
              </NavLink>
              <NavLink to={'/wishlist'} className="header-btn">
                <Heart size={24} color={location.pathname === '/wishlist' ? '#a92e1b' : '#212121'} weight="duotone" />
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
