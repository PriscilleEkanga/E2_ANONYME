const priceFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

/**
 * Formate un prix en euros ("599 €").
 * @param {number} amount - Montant en euros
 * @returns {string}
 */
export function formatPrice(amount) {
  return priceFormatter.format(amount);
}

/**
 * Formate une note sur 5 ("★ 4,8 / 5").
 * @param {number} rating - Note entre 0 et 5
 * @returns {string}
 */
export function formatRating(rating) {
  return `★ ${rating.toLocaleString('fr-FR')} / 5`;
}
