import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';

/** Page affichée pour toute URL inconnue (route "*"). */
function NotFoundPage() {
  return (
    <section className="page-section text-center">
      <div className="container">
        <h1 className="display-4 fw-bold">404</h1>
        <p className="lead">Oups, cette page n'existe pas.</p>
        <Link to={ROUTES.home} className="btn btn-primary">
          Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
