import { formatPrice, formatRating } from '../utils/format';
import CardImage from './CardImage';
import TagList from './TagList';

/**
 * Carte de présentation d'une formation.
 * @param {object} props
 * @param {{ title: string, category: string, level: string, duration: string,
 *           instructor: string, price: number, rating: number, image: string,
 *           technologies: string[], available: boolean }} props.course
 * @param {() => void} props.onSelect - Ouvre la modale de détails
 */
function CourseCard({ course, onSelect }) {
  const { title, category, level, duration, instructor, price, rating, image, technologies, available } =
    course;

  return (
    <article className="card catalog-card h-100">
      <CardImage src={image} alt={title} badge={category} />
      <div className="card-body d-flex flex-column">
        <p className="card-meta">
          {level} · {duration}
          {!available && <span className="badge text-bg-secondary ms-2">Complet</span>}
        </p>
        <h3 className="card-title h5">{title}</h3>
        <p className="card-text text-muted mb-2">Avec {instructor}</p>
        <TagList tags={technologies} />
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="rating">{formatRating(rating)}</span>
          <span className="price">{formatPrice(price)}</span>
        </div>
        <button type="button" className="btn btn-primary mt-3" onClick={onSelect}>
          Voir la formation
        </button>
      </div>
    </article>
  );
}

export default CourseCard;
