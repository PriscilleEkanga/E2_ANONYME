import { useCallback, useMemo, useState } from 'react';

/**
 * Hook personnalisé : gère l'état d'un formulaire contrôlé et sa validation.
 *
 * Les erreurs sont recalculées à chaque saisie, mais ne sont affichées
 * qu'une fois le champ quitté (blur) ou le formulaire soumis,
 * pour ne pas afficher d'erreur pendant que l'utilisateur tape.
 *
 * @param {Record<string, any>} initialValues - Valeurs de départ
 * @param {(values: object) => Record<string, string>} validate - Fonction de validation
 */
function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = useMemo(() => validate(values), [values, validate]);

  const handleChange = useCallback((event) => {
    const { name, type, value, checked } = event.target;
    setValues((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }));
  }, []);

  const handleBlur = useCallback((event) => {
    const { name } = event.target;
    setTouched((previous) => ({ ...previous, [name]: true }));
  }, []);

  /** Erreur à afficher pour un champ (undefined si rien à montrer). */
  const getFieldError = (name) => (touched[name] || isSubmitted ? errors[name] : undefined);

  /**
   * Props communes à brancher sur un champ : <input {...getFieldProps('email')} />
   * @param {string} name - Nom du champ
   * @param {string} [baseClassName] - Classe Bootstrap ('form-control', 'form-select'…)
   */
  const getFieldProps = (name, baseClassName = 'form-control') => {
    const error = getFieldError(name);
    return {
      id: name,
      name,
      value: values[name],
      onChange: handleChange,
      onBlur: handleBlur,
      className: `${baseClassName}${error ? ' is-invalid' : ''}`,
      'aria-invalid': Boolean(error),
      'aria-describedby': error ? `${name}-error` : undefined,
    };
  };

  /** Renvoie le gestionnaire onSubmit : n'appelle onValid que si tout est valide. */
  const handleSubmit = (onValid) => (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (Object.keys(errors).length === 0) onValid(values);
  };

  const resetForm = () => {
    setValues(initialValues);
    setTouched({});
    setIsSubmitted(false);
  };

  return { values, getFieldError, getFieldProps, handleChange, handleBlur, handleSubmit, resetForm };
}

export default useForm;
