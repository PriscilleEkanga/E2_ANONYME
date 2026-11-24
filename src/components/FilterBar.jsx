/**
 * Filtres disponibles. Un <select> n'est affiché que si la liste
 * d'options correspondante est passée en prop (categories, levels, technologies).
 * `name` correspond au champ filtré dans les données de l'API.
 */
const FILTER_DEFINITIONS = [
  { name: 'category', optionsProp: 'categories', allLabel: 'Toutes les catégories' },
  { name: 'level', optionsProp: 'levels', allLabel: 'Tous les niveaux' },
  { name: 'technologies', optionsProp: 'technologies', allLabel: 'Toutes les technologies' },
];

/**
 * Barre de filtres dynamiques et réutilisable.
 * Exemples :
 *   <FilterBar technologies={[...]} categories={[...]} ... />               (projets)
 *   <FilterBar categories={[...]} levels={[...]} technologies={[...]} ... /> (formations)
 *
 * @param {object} props
 * @param {string} props.idPrefix - Préfixe des id des <select>
 * @param {Record<string, string>} props.values - Valeur courante de chaque filtre
 * @param {(name: string, value: string) => void} props.onChange - Appelé quand un filtre change
 * @param {() => void} [props.onReset] - Réinitialise recherche et filtres
 * @param {boolean} [props.canReset] - Active le bouton de réinitialisation
 * @param {string[]} [props.categories] - Options du filtre catégorie
 * @param {string[]} [props.levels] - Options du filtre niveau
 * @param {string[]} [props.technologies] - Options du filtre technologie
 */
function FilterBar({ idPrefix, values, onChange, onReset, canReset = false, ...options }) {
  const visibleFilters = FILTER_DEFINITIONS.filter(({ optionsProp }) =>
    Array.isArray(options[optionsProp]),
  );

  return (
    <div className="filter-bar">
      {visibleFilters.map(({ name, optionsProp, allLabel }) => (
        <select
          key={name}
          id={`${idPrefix}-${name}`}
          className="form-select"
          aria-label={allLabel}
          value={values[name] ?? ''}
          onChange={(event) => onChange(name, event.target.value)}
        >
          <option value="">{allLabel}</option>
          {options[optionsProp].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ))}

      {onReset && (
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onReset}
          disabled={!canReset}
        >
          Réinitialiser
        </button>
      )}
    </div>
  );
}

export default FilterBar;
