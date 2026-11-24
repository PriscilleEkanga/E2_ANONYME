import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS, ROUTES } from '../config/routes';

/**
 * En-tête du site avec la navigation principale (React Router).
 * Le menu mobile est piloté par un state local : pas besoin du JavaScript de Bootstrap.
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header sticky-top">
      <nav className="navbar navbar-expand-md navbar-dark" aria-label="Navigation principale">
        <div className="container">
          <Link className="navbar-brand fw-bold" to={ROUTES.home} onClick={closeMenu}>
            <span className="brand-accent">Web</span>Craft Solutions
          </Link>

          <button
            type="button"
            className="navbar-toggler"
            aria-controls="main-nav"
            aria-expanded={isMenuOpen}
            aria-label="Afficher ou masquer la navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div id="main-nav" className={`collapse navbar-collapse${isMenuOpen ? ' show' : ''}`}>
            <ul className="navbar-nav ms-auto gap-md-2">
              {NAV_LINKS.map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  {/* NavLink ajoute automatiquement la classe "active" sur la page courante */}
                  <NavLink className="nav-link" to={to} end={to === ROUTES.home} onClick={closeMenu}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
