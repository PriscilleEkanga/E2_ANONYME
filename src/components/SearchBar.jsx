/**
 * Barre de recherche contrôlée et réutilisable (recherche en temps réel).
 *
 * @param {object} props
 * @param {string} props.id - Identifiant unique (plusieurs barres peuvent coexister sur une page)
 * @param {string} props.value - Texte actuellement recherché
 * @param {(value: string) => void} props.onChange - Appelé à chaque frappe avec le nouveau texte
 * @param {string} [props.placeholder] - Texte d'aide affiché dans le champ
 */
function SearchBar({ id, value, onChange, placeholder = 'Rechercher…' }) {
  return (
    <div className="search-bar">
      <label htmlFor={id} className="visually-hidden">
        {placeholder}
      </label>
      <span className="search-icon" aria-hidden="true">
        ⌕
      </span>
      <input
        id={id}
        type="search"
        className="form-control"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
