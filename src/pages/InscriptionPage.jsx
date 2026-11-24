import { useParams } from 'react-router-dom';

/**
 * Page d'inscription (routes "/inscription" et "/inscription/:courseId").
 * Le formulaire sera ajouté à l'étape 9.
 */
function InscriptionPage() {
  // Paramètre dynamique de l'URL : /inscription/3 -> courseId = "3"
  const { courseId } = useParams();

  return (
    <section className="page-section">
      <div className="container container-narrow">
        <h1 className="h2">Inscription à une formation</h1>
        <p className="text-muted">
          Page en construction.
          {courseId && ` Formation pré-sélectionnée : n°${courseId}.`}
        </p>
      </div>
    </section>
  );
}

export default InscriptionPage;
