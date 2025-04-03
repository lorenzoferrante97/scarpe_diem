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
        <div>
          <span className="logo">ScarpeDiem</span>
        </div>
        <div>
          <nav>
            <NavLink to={'/'} className="nav-item">
              Home
            </NavLink>
            {/* cart + wishlist */}
            <div>
              <NavLink to={'/cart'} className="header-btn">
                <Basket size={24} color="#212121" weight="duotone" />
              </NavLink>
              <button className="header-btn">
                <Heart size={24} color="#212121" weight="duotone" />
              </button>
              <NavLink to={'/search'} className="header-btn">
                <MagnifyingGlass size={24} color="#212121" weight="duotone" />
              </NavLink>
            </div>
          </nav>
        </div>
      </header>
    </section>
  );
}
