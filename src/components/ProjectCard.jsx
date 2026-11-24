import CardImage from './CardImage';
import TagList from './TagList';

/**
 * Carte de présentation d'un projet.
 * @param {object} props
 * @param {{ title: string, client: string, category: string, year: number,
 *           image: string, description: string, technologies: string[] }} props.project
 * @param {() => void} props.onSelect - Ouvre la modale de détails
 */
function ProjectCard({ project, onSelect }) {
  const { title, client, category, year, image, description, technologies } = project;

  return (
    <article className="card catalog-card h-100">
      <CardImage src={image} alt={title} badge={category} />
      <div className="card-body d-flex flex-column">
        <p className="card-meta">
          {client} · {year}
        </p>
        <h3 className="card-title h5">{title}</h3>
        <p className="card-text text-muted clamp-3">{description}</p>
        <TagList tags={technologies} />
        <button type="button" className="btn btn-primary mt-auto" onClick={onSelect}>
          Voir le projet
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;
