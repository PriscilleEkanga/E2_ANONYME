import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';

/**
 * Section d'accueil animée (animations 100 % CSS, voir .hero dans App.css) :
 * apparition progressive des textes et formes flottantes en arrière-plan.
 */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-shapes" aria-hidden="true">
        <span className="shape shape-1" />
        <span className="shape shape-2" />
        <span className="shape shape-3" />
      </div>

      <div className="container position-relative">
        <p className="hero-kicker fade-up">Agence web & centre de formation</p>
        <h1 className="hero-title fade-up delay-1">
          Nous concevons vos projets <span className="gradient-text">et formons vos équipes</span>
        </h1>
        <p className="hero-text fade-up delay-2">
          Sites vitrines, e-commerce, applications mobiles et dashboards… Découvrez nos
          réalisations et montez en compétences avec nos formations encadrées par des experts.
        </p>
        <div className="d-flex flex-wrap gap-3 fade-up delay-3">
          <a href="#projets" className="btn btn-light btn-lg">
            Voir nos projets
          </a>
          <Link to={ROUTES.inscription} className="btn btn-outline-light btn-lg">
            S'inscrire à une formation
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
