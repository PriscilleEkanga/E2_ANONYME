/**
 * Enveloppe d'un champ de formulaire : libellé + champ (children) + message d'erreur.
 * Évite de répéter la même structure pour chaque champ du formulaire.
 * @param {object} props
 * @param {string} props.name - Nom du champ (sert d'id pour le label et l'erreur)
 * @param {string} props.label - Libellé affiché
 * @param {string} [props.error] - Message d'erreur à afficher
 * @param {boolean} [props.isRequired] - Ajoute un astérisque au libellé
 * @param {string} [props.className] - Classes de la colonne Bootstrap
 * @param {import('react').ReactNode} props.children - Le champ lui-même
 */
function FormField({ name, label, error, isRequired = false, className = 'col-12', children }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="form-label">
        {label}
        {isRequired && <span className="text-danger"> *</span>}
      </label>
      {children}
      {error && (
        <div id={`${name}-error`} className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
}

export default FormField;
