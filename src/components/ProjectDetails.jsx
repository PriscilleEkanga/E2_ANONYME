import CardImage from './CardImage';
import InfoList from './InfoList';
import TagList from './TagList';

/**
 * Contenu de la modale de détails d'un projet.
 * @param {object} props
 * @param {{ title: string, client: string, category: string, year: number, duration: string,
 *           image: string, description: string, features: string[],
 *           technologies: string[], url?: string }} props.project
 */
function ProjectDetails({ project }) {
  const { title, client, category, year, duration, image, description, features, technologies, url } =
    project;

  return (
    <div className="details">
      <CardImage src={image} alt={title} />
      <p className="mt-3">{description}</p>

      <InfoList
        items={[
          { label: 'Client', value: client },
          { label: 'Catégorie', value: category },
          { label: 'Année', value: year },
          { label: 'Durée', value: duration },
        ]}
      />

      <h3 className="h6 mt-3">Fonctionnalités</h3>
      <ul>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <h3 className="h6">Technologies</h3>
      <TagList tags={technologies} />

      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
          Visiter le site
        </a>
      )}
    </div>
  );
}

export default ProjectDetails;
