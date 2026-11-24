import CoursesSection from '../components/CoursesSection';
import Hero from '../components/Hero';
import ProjectsSection from '../components/ProjectsSection';

/**
 * Page d'accueil (route "/") : Hero + section Projets (API 1) + section Formations (API 2).
 * Header et Footer sont rendus une seule fois dans App.jsx, communs à toutes les pages.
 */
function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <CoursesSection />
    </>
  );
}

export default Home;
