import { API_URLS } from '../config/api';
import { COURSES_CATALOG } from '../config/catalog';
import useFetch from '../hooks/useFetch';
import CatalogSection from './CatalogSection';
import CourseCard from './CourseCard';
import CourseDetails from './CourseDetails';

/**
 * Section « Formations » : charge l'API 2 et la branche sur le catalogue générique.
 * @param {object} props
 * @param {string} [props.title] - Titre de la section
 */
function CoursesSection({ title = 'Nos formations' }) {
  const { data, isLoading, error, refetch } = useFetch(API_URLS.courses);

  return (
    <CatalogSection
      id="formations"
      title={title}
      subtitle="Des formations pratiques, du niveau débutant à avancé."
      items={data?.courses}
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      config={COURSES_CATALOG}
      filterOptions={{
        categories: data?.categories,
        levels: data?.levels,
        technologies: data?.technologies,
      }}
      renderCard={(course, onSelect) => <CourseCard course={course} onSelect={onSelect} />}
      renderDetails={(course) => <CourseDetails course={course} />}
    />
  );
}

export default CoursesSection;
