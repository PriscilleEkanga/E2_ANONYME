import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Remonte en haut de la page à chaque changement de route
 * (React Router conserve sinon la position de défilement de la page précédente).
 * Les liens d'ancre (#projets) sont laissés au navigateur.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
