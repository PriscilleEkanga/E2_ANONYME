/**
 * Logique métier de recherche et de filtrage, indépendante de React.
 */

/**
 * Normalise un texte pour une comparaison souple :
 * minuscules et suppression des accents ("Débutant" -> "debutant").
 * @param {unknown} text - Valeur à normaliser
 * @returns {string} Texte normalisé
 */
export function normalizeText(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

/**
 * Indique si un élément contient la recherche dans au moins un des champs donnés.
 * Les champs de type tableau (ex. technologies) sont parcourus entièrement.
 * @param {object} item - Élément à tester
 * @param {string} query - Texte recherché
 * @param {string[]} searchKeys - Champs dans lesquels chercher
 * @returns {boolean}
 */
export function matchesQuery(item, query, searchKeys) {
  const normalizedQuery = normalizeText(query).trim();
  if (!normalizedQuery) return true;

  return searchKeys.some((key) => {
    const value = Array.isArray(item[key]) ? item[key].join(' ') : item[key];
    return normalizeText(value).includes(normalizedQuery);
  });
}

/**
 * Indique si un élément respecte tous les filtres actifs.
 * Un filtre vide ("") est ignoré. Pour un champ tableau, la valeur doit y figurer.
 * @param {object} item - Élément à tester
 * @param {Record<string, string>} filters - Ex. { category: 'Mobile', technologies: '' }
 * @returns {boolean}
 */
export function matchesFilters(item, filters) {
  return Object.entries(filters).every(([key, value]) => {
    if (!value) return true;
    const fieldValue = item[key];
    return Array.isArray(fieldValue) ? fieldValue.includes(value) : fieldValue === value;
  });
}

/**
 * Applique la recherche texte puis les filtres à une liste.
 * @param {object[]} items - Liste complète
 * @param {string} query - Texte recherché
 * @param {string[]} searchKeys - Champs de recherche
 * @param {Record<string, string>} filters - Filtres actifs
 * @returns {object[]} Liste filtrée
 */
export function filterItems(items, query, searchKeys, filters) {
  return items.filter(
    (item) => matchesQuery(item, query, searchKeys) && matchesFilters(item, filters),
  );
}
