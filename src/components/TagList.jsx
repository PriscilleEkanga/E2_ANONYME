/**
 * Liste de badges (technologies…). Utilisée dans les cartes et les modales.
 * @param {object} props
 * @param {string[]} props.tags - Libellés à afficher
 * @param {string} [props.label] - Libellé accessible de la liste
 */
function TagList({ tags, label = 'Technologies' }) {
  return (
    <ul className="tag-list" aria-label={label}>
      {tags.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default TagList;
