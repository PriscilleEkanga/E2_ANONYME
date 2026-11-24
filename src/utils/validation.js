/**
 * Fonctions de validation du formulaire d'inscription.
 * Toutes les fonctions sont pures : elles ne dépendent pas de React.
 */

const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Téléphone français : 0X XX XX XX XX ou +33 X XX XX XX XX (espaces, points ou tirets acceptés)
const PHONE_REGEX = /^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

export const MESSAGE_MAX_LENGTH = 500;

/** Messages d'erreur affichés sous les champs. */
export const ERROR_MESSAGES = {
  required: 'Ce champ est obligatoire.',
  name: 'Entre 2 et 50 lettres (accents, espaces et tirets acceptés).',
  email: 'Adresse e-mail invalide (ex. nom@domaine.fr).',
  phone: 'Numéro invalide (ex. 06 12 34 56 78).',
  course: 'Veuillez choisir une formation.',
  message: `Le message ne doit pas dépasser ${MESSAGE_MAX_LENGTH} caractères.`,
  terms: 'Vous devez accepter les conditions pour vous inscrire.',
};

/**
 * Vérifie qu'une valeur n'est pas vide (les espaces seuls comptent comme vide).
 * @param {unknown} value
 * @returns {boolean}
 */
export function isRequired(value) {
  return String(value ?? '').trim().length > 0;
}

/**
 * Vérifie un prénom ou un nom (lettres, accents, espaces, tirets, apostrophes).
 * @param {string} value
 * @returns {boolean}
 */
export function isValidName(value) {
  return NAME_REGEX.test(value.trim());
}

/**
 * Vérifie le format d'une adresse e-mail.
 * @param {string} value
 * @returns {boolean}
 */
export function isValidEmail(value) {
  return EMAIL_REGEX.test(value.trim());
}

/**
 * Vérifie un numéro de téléphone français.
 * @param {string} value
 * @returns {boolean}
 */
export function isValidPhone(value) {
  return PHONE_REGEX.test(value.trim());
}

/**
 * Valide toutes les valeurs du formulaire d'inscription.
 * @param {{firstName: string, lastName: string, email: string, phone: string,
 *          courseId: string, message: string, acceptTerms: boolean}} values
 * @returns {Record<string, string>} Erreurs par champ (objet vide si tout est valide)
 */
export function validateInscription(values) {
  const errors = {};

  ['firstName', 'lastName'].forEach((field) => {
    if (!isRequired(values[field])) errors[field] = ERROR_MESSAGES.required;
    else if (!isValidName(values[field])) errors[field] = ERROR_MESSAGES.name;
  });

  if (!isRequired(values.email)) errors.email = ERROR_MESSAGES.required;
  else if (!isValidEmail(values.email)) errors.email = ERROR_MESSAGES.email;

  // Le téléphone est facultatif, mais doit être valide s'il est rempli
  if (isRequired(values.phone) && !isValidPhone(values.phone)) {
    errors.phone = ERROR_MESSAGES.phone;
  }

  if (!isRequired(values.courseId)) errors.courseId = ERROR_MESSAGES.course;

  if (values.message.length > MESSAGE_MAX_LENGTH) errors.message = ERROR_MESSAGES.message;

  if (!values.acceptTerms) errors.acceptTerms = ERROR_MESSAGES.terms;

  return errors;
}
