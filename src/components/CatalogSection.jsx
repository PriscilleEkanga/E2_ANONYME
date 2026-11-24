import { useCallback, useState } from 'react';
import useSearch from '../hooks/useSearch';
import ErrorMessage from './ErrorMessage';
import FilterBar from './FilterBar';
import Loader from './Loader';
import Modal from './Modal';
import SearchBar from './SearchBar';

/**
 * Section catalogue générique : SearchBar + FilterBar + grille de cartes + Modal de détails.
 * Utilisée à l'identique pour les Projets et les Formations : seul le contenu
 * (cartes, détails, options de filtres) change, via les props `renderCard` et `renderDetails`.
 *
 * @param {object} props
 * @param {string} props.id - Ancre HTML de la section (ex. "projets")
 * @param {string} props.title - Titre de la section
 * @param {string} [props.subtitle] - Sous-titre
 * @param {object[]|undefined} props.items - Éléments issus de l'API
 * @param {boolean} props.isLoading - Chargement en cours
 * @param {string|null} props.error - Message d'erreur éventuel
 * @param {() => void} props.onRetry - Relance l'appel API
 * @param {{ searchKeys: string[], filterKeys: string[], searchPlaceholder: string }} props.config
 * @param {{ categories?: string[], levels?: string[], technologies?: string[] }} props.filterOptions
 * @param {(item: object, onSelect: () => void) => import('react').ReactNode} props.renderCard
 * @param {(item: object) => import('react').ReactNode} props.renderDetails
 */
function CatalogSection({
  id,
  title,
  subtitle,
  items,
  isLoading,
  error,
  onRetry,
  config,
  filterOptions,
  renderCard,
  renderDetails,
}) {
  const { query, setQuery, filters, updateFilter, resetFilters, results, hasActiveCriteria } =
    useSearch(items, config.searchKeys, config.filterKeys);
  const [selectedItem, setSelectedItem] = useState(null);

  // Référence stable : évite de ré-exécuter l'effet de la Modal à chaque rendu
  const closeModal = useCallback(() => setSelectedItem(null), []);

  const renderContent = () => {
    if (isLoading) return <Loader label={`Chargement : ${title.toLowerCase()}…`} />;
    if (error) return <ErrorMessage message={error} onRetry={onRetry} />;

    return (
      <>
        <div className="catalog-toolbar">
          <SearchBar
            id={`${id}-search`}
            value={query}
            onChange={setQuery}
            placeholder={config.searchPlaceholder}
          />
          <FilterBar
            idPrefix={id}
            values={filters}
            onChange={updateFilter}
            onReset={resetFilters}
            canReset={hasActiveCriteria}
            {...filterOptions}
          />
        </div>

        <p className="results-count" aria-live="polite">
          {results.length} résultat{results.length > 1 ? 's' : ''}
        </p>

        {results.length === 0 ? (
          <p className="empty-state">Aucun résultat ne correspond à votre recherche.</p>
        ) : (
          <div className="row g-4">
            {results.map((item) => (
              <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
                {renderCard(item, () => setSelectedItem(item))}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <section id={id} className="catalog-section">
      <div className="container">
        <header className="section-header">
          <h2>{title}</h2>
          {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
        </header>
        {renderContent()}
      </div>

      <Modal isOpen={selectedItem !== null} title={selectedItem?.title ?? ''} onClose={closeModal}>
        {selectedItem && renderDetails(selectedItem)}
      </Modal>
    </section>
  );
}

export default CatalogSection;
