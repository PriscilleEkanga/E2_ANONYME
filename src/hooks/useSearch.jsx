import { useCallback, useMemo, useState } from 'react';
import { filterItems } from '../utils/search';

/**
 * Crée l'objet de filtres initial : chaque filtre vaut "" (= tous).
 * @param {string[]} filterKeys
 * @returns {Record<string, string>}
 */
function createEmptyFilters(filterKeys) {
  return Object.fromEntries(filterKeys.map((key) => [key, '']));
}

/**
 * Hook personnalisé : recherche temps réel + filtres sur une liste.
 * Réutilisé tel quel par les sections Projets et Formations.
 *
 * @param {object[]|undefined} items - Liste à filtrer (undefined pendant le chargement)
 * @param {string[]} searchKeys - Champs dans lesquels chercher le texte
 * @param {string[]} filterKeys - Champs filtrables
 * @returns {{
 *   query: string, setQuery: (query: string) => void,
 *   filters: Record<string, string>, updateFilter: (name: string, value: string) => void,
 *   resetFilters: () => void, results: object[], hasActiveCriteria: boolean
 * }}
 */
function useSearch(items, searchKeys, filterKeys) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(() => createEmptyFilters(filterKeys));

  // Recalcul uniquement quand la liste, la recherche ou les filtres changent
  const results = useMemo(
    () => filterItems(items ?? [], query, searchKeys, filters),
    [items, query, searchKeys, filters],
  );

  const updateFilter = useCallback((name, value) => {
    setFilters((previous) => ({ ...previous, [name]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setQuery('');
    setFilters(createEmptyFilters(filterKeys));
  }, [filterKeys]);

  const hasActiveCriteria = query.trim() !== '' || Object.values(filters).some(Boolean);

  return { query, setQuery, filters, updateFilter, resetFilters, results, hasActiveCriteria };
}

export default useSearch;
