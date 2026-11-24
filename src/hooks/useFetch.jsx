import { useCallback, useEffect, useState } from 'react';

/**
 * Hook personnalisé : charge des données JSON depuis une URL.
 *
 * - Gère les trois états d'un appel réseau : chargement, succès, erreur.
 * - Annule la requête (AbortController) si le composant est démonté
 *   ou si l'URL change, pour ne pas mettre à jour un composant disparu.
 * - Expose `refetch` pour relancer l'appel (bouton « Réessayer »).
 *
 * @param {string} url - URL de l'API à appeler
 * @returns {{ data: any, isLoading: boolean, error: string|null, refetch: () => void }}
 */
function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Incrémenter ce compteur relance l'effet, donc l'appel réseau
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(url, { signal: controller.signal });
        // fetch ne rejette pas sur une erreur HTTP (404, 500…) : il faut tester response.ok
        if (!response.ok) {
          throw new Error(`Le serveur a répondu avec le code ${response.status}.`);
        }
        setData(await response.json());
      } catch (err) {
        // Une annulation volontaire n'est pas une erreur à afficher
        if (err.name === 'AbortError') return;
        setError(err.message || 'Une erreur inconnue est survenue.');
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [url, reloadCount]);

  const refetch = useCallback(() => setReloadCount((count) => count + 1), []);

  return { data, isLoading, error, refetch };
}

export default useFetch;
