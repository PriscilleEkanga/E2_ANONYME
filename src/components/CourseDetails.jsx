import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { formatPrice, formatRating } from '../utils/format';
import CardImage from './CardImage';
import InfoList from './InfoList';
import TagList from './TagList';

/**
 * Contenu de la modale de détails d'une formation,
 * avec un lien vers l'inscription pré-remplie (route dynamique /inscription/:courseId).
 * @param {object} props
 * @param {{ id: number, title: string, category: string, level: string, duration: string,
 *           instructor: string, price: number, rating: number, students: number,
 *           image: string, description: string, modules: string[],
 *           technologies: string[], available: boolean }} props.course
 */
function CourseDetails({ course }) {
  const { id, title, image, description, modules, technologies, available } = course;

  return (
    <div className="details">
      <CardImage src={image} alt={title} />
      <p className="mt-3">{description}</p>

      <InfoList
        items={[
          { label: 'Catégorie', value: course.category },
          { label: 'Niveau', value: course.level },
          { label: 'Durée', value: course.duration },
          { label: 'Formateur', value: course.instructor },
          { label: 'Prix', value: formatPrice(course.price) },
          { label: 'Note', value: `${formatRating(course.rating)} (${course.students} apprenants)` },
        ]}
      />

      <h3 className="h6 mt-3">Programme</h3>
      <ol>
        {modules.map((module) => (
          <li key={module}>{module}</li>
        ))}
      </ol>

      <h3 className="h6">Technologies</h3>
      <TagList tags={technologies} />

      {available ? (
        <Link to={`${ROUTES.inscription}/${id}`} className="btn btn-primary">
          S'inscrire à cette formation
        </Link>
      ) : (
        <p className="alert alert-secondary mb-0">Cette session est complète pour le moment.</p>
      )}
    </div>
  );
}

export default CourseDetails;
