import useForm from '../hooks/useForm';
import { formatPrice } from '../utils/format';
import { MESSAGE_MAX_LENGTH, validateInscription } from '../utils/validation';
import FormField from './FormField';

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  courseId: '',
  message: '',
  acceptTerms: false,
};

/**
 * Formulaire d'inscription à une formation (champs contrôlés + validation externalisée).
 * @param {object} props
 * @param {object[]} props.courses - Formations issues de l'API 2
 * @param {string} [props.defaultCourseId] - Formation pré-sélectionnée (paramètre d'URL)
 * @param {(inscription: object) => void} props.onSuccess - Appelé avec les données validées
 */
function InscriptionForm({ courses, defaultCourseId = '', onSuccess }) {
  const availableCourses = courses.filter((course) => course.available);
  // On ne pré-sélectionne la formation que si elle existe et est ouverte
  const isDefaultValid = availableCourses.some((course) => String(course.id) === defaultCourseId);

  const { values, getFieldError, getFieldProps, handleChange, handleSubmit, resetForm } = useForm(
    { ...INITIAL_VALUES, courseId: isDefaultValid ? defaultCourseId : '' },
    validateInscription,
  );

  const submitInscription = (formValues) => {
    const course = courses.find(({ id }) => String(id) === formValues.courseId);
    onSuccess({ ...formValues, course });
    resetForm();
  };

  const termsError = getFieldError('acceptTerms');

  return (
    <form className="inscription-form card" noValidate onSubmit={handleSubmit(submitInscription)}>
      <div className="row g-3">
        <FormField name="firstName" label="Prénom" isRequired className="col-md-6" error={getFieldError('firstName')}>
          <input type="text" autoComplete="given-name" {...getFieldProps('firstName')} />
        </FormField>

        <FormField name="lastName" label="Nom" isRequired className="col-md-6" error={getFieldError('lastName')}>
          <input type="text" autoComplete="family-name" {...getFieldProps('lastName')} />
        </FormField>

        <FormField name="email" label="E-mail" isRequired className="col-md-6" error={getFieldError('email')}>
          <input type="email" autoComplete="email" {...getFieldProps('email')} />
        </FormField>

        <FormField name="phone" label="Téléphone" className="col-md-6" error={getFieldError('phone')}>
          <input type="tel" autoComplete="tel" placeholder="06 12 34 56 78" {...getFieldProps('phone')} />
        </FormField>

        <FormField name="courseId" label="Formation" isRequired error={getFieldError('courseId')}>
          <select {...getFieldProps('courseId', 'form-select')}>
            <option value="">Choisissez une formation</option>
            {availableCourses.map(({ id, title, level, price }) => (
              <option key={id} value={String(id)}>
                {title} · {level} · {formatPrice(price)}
              </option>
            ))}
          </select>
        </FormField>

        <FormField name="message" label="Message (facultatif)" error={getFieldError('message')}>
          <textarea rows={4} maxLength={MESSAGE_MAX_LENGTH} {...getFieldProps('message')} />
          <small className="form-text">
            {values.message.length} / {MESSAGE_MAX_LENGTH} caractères
          </small>
        </FormField>

        <div className="col-12">
          <div className="form-check">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              className={`form-check-input${termsError ? ' is-invalid' : ''}`}
              checked={values.acceptTerms}
              onChange={handleChange}
            />
            <label htmlFor="acceptTerms" className="form-check-label">
              J'accepte que mes données soient utilisées pour traiter mon inscription. *
            </label>
            {termsError && <div className="invalid-feedback d-block">{termsError}</div>}
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary btn-lg w-100">
            Valider mon inscription
          </button>
        </div>
      </div>
    </form>
  );
}

export default InscriptionForm;
