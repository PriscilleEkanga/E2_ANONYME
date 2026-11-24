import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../config/routes';

/** Pied de page commun à toutes les pages. */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <p className="mb-0">© {currentYear} WebCraft Solutions · Projets web & formations</p>
        <nav aria-label="Liens du pied de page">
          <ul className="list-unstyled d-flex gap-3 mb-0">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
