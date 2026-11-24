/**
 * Spinner de chargement (animation CSS).
 * @param {object} props
 * @param {string} [props.label] - Texte affiché et lu par les lecteurs d'écran
 */
function Loader({ label = 'Chargement…' }) {
  return (
    <div className="loader" role="status">
      <span className="loader-spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default Loader;
