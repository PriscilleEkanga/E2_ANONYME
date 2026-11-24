/**
 * URLs des API REST utilisées par le portail.
 * Centralisées ici pour ne jamais écrire une URL en dur dans un composant.
 */
const API_BASE_URL = 'https://webcraft-api.vercel.app/data';

export const API_URLS = {
  projects: `${API_BASE_URL}/projects.json`,
  courses: `${API_BASE_URL}/courses.json`,
};
