/**
 * Message d'erreur affiché quand une API ne répond pas.
 * @param {object} props
 * @param {string} props.message - Détail de l'erreur
 * @param {() => void} [props.onRetry] - Si fourni, affiche un bouton « Réessayer »
 */
function ErrorMessage({ message, onRetry }) {
  return (
    <div
      className="alert alert-danger d-flex flex-wrap justify-content-between align-items-center gap-2"
      role="alert"
    >
      <span>
        <strong>Impossible de charger les données.</strong> {message}
      </span>
      {onRetry && (
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={onRetry}>
          Réessayer
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
