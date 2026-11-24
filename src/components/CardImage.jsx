import { FALLBACK_IMAGE } from '../config/catalog';

/**
 * Image d'en-tête de carte, avec badge optionnel et image de secours
 * si l'URL fournie par l'API est cassée.
 * @param {object} props
 * @param {string} props.src - URL de l'image
 * @param {string} props.alt - Texte alternatif
 * @param {string} [props.badge] - Texte du badge affiché sur l'image (ex. catégorie)
 */
function CardImage({ src, alt, badge }) {
  const handleError = (event) => {
    event.currentTarget.onerror = null; // évite une boucle si l'image de secours échoue
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className="card-image">
      <img src={src} alt={alt} loading="lazy" onError={handleError} />
      {badge && <span className="badge card-badge">{badge}</span>}
    </div>
  );
}

export default CardImage;
