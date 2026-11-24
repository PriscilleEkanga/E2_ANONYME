/**
 * Configuration des deux catalogues (projets et formations).
 * - searchKeys : champs dans lesquels cherche la SearchBar
 * - filterKeys : champs filtrables par la FilterBar (même nom que dans l'API)
 * Ces tableaux sont définis hors des composants : leur référence reste stable
 * entre deux rendus, ce qui évite des recalculs inutiles dans useSearch.
 */
export const PROJECTS_CATALOG = {
  searchKeys: ['title', 'client', 'description', 'technologies'],
  filterKeys: ['category', 'technologies'],
  searchPlaceholder: 'Rechercher un projet, un client, une techno…',
};

export const COURSES_CATALOG = {
  searchKeys: ['title', 'instructor', 'description', 'technologies'],
  filterKeys: ['category', 'level', 'technologies'],
  searchPlaceholder: 'Rechercher une formation, un formateur…',
};

/** Image affichée si l'image fournie par l'API ne se charge pas. */
export const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450">' +
      '<rect width="100%" height="100%" fill="#e9ecef"/>' +
      '<text x="50%" y="50%" fill="#6c757d" font-family="sans-serif" font-size="32" ' +
      'text-anchor="middle" dominant-baseline="middle">WebCraft</text></svg>',
  );
