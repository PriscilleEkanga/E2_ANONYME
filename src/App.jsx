import { API_URLS } from './config/api';
import useFetch from './hooks/useFetch';

/**
 * Composant racine (provisoire) : affiche le résultat de useFetch sur les 2 API
 * pour vérifier le hook. Le Router et la vraie mise en page arrivent à l'étape 4.
 */
function App() {
  const projects = useFetch(API_URLS.projects);
  const courses = useFetch(API_URLS.courses);

  /** Résume l'état d'un appel API en une phrase. */
  const describe = ({ data, isLoading, error }, key) => {
    if (isLoading) return 'chargement…';
    if (error) return `erreur : ${error}`;
    return `${data[key].length} éléments chargés`;
  };

  return (
    <main className="container py-5">
      <h1>WebCraft Solutions</h1>
      <ul>
        <li>API 1 · Projets : {describe(projects, 'projects')}</li>
        <li>API 2 · Formations : {describe(courses, 'courses')}</li>
      </ul>
    </main>
  );
}

export default App;
