import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * Fenêtre modale réutilisable (détails projet, détails formation, confirmation…).
 *
 * - Rendue dans <body> via un portail, pour passer au-dessus de tout le contenu.
 * - Se ferme avec la touche Échap, le bouton ✕ ou un clic sur le fond.
 * - Bloque le défilement de la page tant qu'elle est ouverte.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Affiche ou non la modale
 * @param {string} props.title - Titre affiché en en-tête
 * @param {() => void} props.onClose - Appelé pour fermer (à mémoriser avec useCallback)
 * @param {import('react').ReactNode} props.children - Contenu de la modale
 */
function Modal({ isOpen, title, onClose, children }) {
  const titleId = useId();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus(); // accessibilité : le focus entre dans la modale

    // Nettoyage : on retire l'écouteur et on rétablit le défilement
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal-panel-header">
          <h2 id={titleId} className="h4 mb-0">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="btn-close"
            aria-label="Fermer"
            onClick={onClose}
          />
        </header>
        <div className="modal-panel-body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
