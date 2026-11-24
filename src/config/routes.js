/** Chemins des routes de l'application (React Router). */
export const ROUTES = {
  home: '/',
  projects: '/projets',
  courses: '/formations',
  inscription: '/inscription',
};

/** Liens affichés dans la navigation (Header et Footer). */
export const NAV_LINKS = [
  { to: ROUTES.home, label: 'Accueil' },
  { to: ROUTES.projects, label: 'Projets' },
  { to: ROUTES.courses, label: 'Formations' },
  { to: ROUTES.inscription, label: 'Inscription' },
];
