/**
 * Liste de caractéristiques « libellé : valeur » affichée dans les modales de détails.
 * @param {object} props
 * @param {{ label: string, value: import('react').ReactNode }[]} props.items
 */
function InfoList({ items }) {
  return (
    <dl className="info-list">
      {items.map(({ label, value }) => (
        <div key={label} className="info-list-item">
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default InfoList;
