import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import InscriptionForm from '../components/InscriptionForm';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { API_URLS } from '../config/api';
import useFetch from '../hooks/useFetch';

/**
 * Page d'inscription (routes "/inscription" et "/inscription/:courseId").
 * Le paramètre dynamique :courseId pré-sélectionne la formation choisie
 * depuis la modale de détails. La liste des formations vient de l'API 2.
 */
function InscriptionPage() {
  // Paramètre dynamique de l'URL : /inscription/3 -> courseId = "3"
  const { courseId = '' } = useParams();
  const { data, isLoading, error, refetch } = useFetch(API_URLS.courses);
  const [confirmation, setConfirmation] = useState(null);

  const closeConfirmation = useCallback(() => setConfirmation(null), []);

  return (
    <section className="page-section">
      <div className="container container-narrow">
        <header className="section-header">
          <h1 className="h2">Inscription à une formation</h1>
          <p className="text-muted mb-0">
            Remplissez le formulaire, notre équipe vous recontacte sous 48 h.
          </p>
        </header>

        {isLoading && <Loader label="Chargement des formations…" />}
        {error && <ErrorMessage message={error} onRetry={refetch} />}
        {data && (
          // key : remonte le formulaire si on change de formation via l'URL
          <InscriptionForm
            key={courseId}
            courses={data.courses}
            defaultCourseId={courseId}
            onSuccess={setConfirmation}
          />
        )}
      </div>

      <Modal isOpen={confirmation !== null} title="Inscription enregistrée" onClose={closeConfirmation}>
        {confirmation && (
          <p className="mb-0">
            Merci {confirmation.firstName} ! Votre demande d'inscription à{' '}
            <strong>{confirmation.course?.title}</strong> a bien été prise en compte. Un e-mail
            de confirmation sera envoyé à <strong>{confirmation.email}</strong>.
          </p>
        )}
      </Modal>
    </section>
  );
}

export default InscriptionPage;
