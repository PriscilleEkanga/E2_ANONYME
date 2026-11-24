import { API_URLS } from '../config/api';
import { PROJECTS_CATALOG } from '../config/catalog';
import useFetch from '../hooks/useFetch';
import CatalogSection from './CatalogSection';
import ProjectCard from './ProjectCard';
import ProjectDetails from './ProjectDetails';

/**
 * Section « Projets » : charge l'API 1 et la branche sur le catalogue générique.
 * @param {object} props
 * @param {string} [props.title] - Titre de la section
 */
function ProjectsSection({ title = 'Nos réalisations' }) {
  const { data, isLoading, error, refetch } = useFetch(API_URLS.projects);

  return (
    <CatalogSection
      id="projets"
      title={title}
      subtitle="Une sélection de projets livrés pour nos clients."
      items={data?.projects}
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      config={PROJECTS_CATALOG}
      filterOptions={{ technologies: data?.technologies, categories: data?.categories }}
      renderCard={(project, onSelect) => <ProjectCard project={project} onSelect={onSelect} />}
      renderDetails={(project) => <ProjectDetails project={project} />}
    />
  );
}

export default ProjectsSection;
