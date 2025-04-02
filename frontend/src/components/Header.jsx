import { NavLink } from 'react-router-dom';

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
        <nav>
          <NavLink to={'/'} className="nav-item">
            Home
          </NavLink>
        </nav>
      </header>
    </section>
  );
}
