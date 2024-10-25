import { useContactForm } from '@/hooks';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ContactForm.scss';

const ContactForm = ({ className }: { className: string }) => {
  const {
    input,
    errors,
    isSubmitting,
    hasSubmitted,
    errorMessage,
    handleChange,
    handleSubmit
  } = useContactForm();

  return hasSubmitted ? (
    <p className="confirmationMsg">
      Thank you for reaching out. I will be in touch shortly.
    </p>
  ) : (
    <form onSubmit={handleSubmit} className={`form ${className}`} noValidate>
      {errorMessage && <div className="form__error">{errorMessage}</div>}

      {/* Select Dropdown */}
      <div className="form__group form__group--select">
        <select
          id="option"
          name="option"
          value={input.option}
          onChange={handleChange}
          className={`form__select ${
            input.option ? 'form__select--not-empty' : ''
          }`}
        >
          <option value="" disabled hidden></option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="other">Other</option>
        </select>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="form__select-icon"
          size={'lg'}
        />
        <span className="form__placeholder">What interests you?</span>

        {!errors.option ? (
          <label htmlFor="option" className="form__label">
            Select one of the options
          </label>
        ) : (
          <span className="form__error">{errors.option}</span>
        )}
      </div>

      {/* Name Input */}
      <div className="form__group">
        <input
          type="text"
          id="name"
          name="name"
          value={input.name}
          onChange={handleChange}
          className={`form__input ${
            input.name ? 'form__input--not-empty' : ''
          }`}
        />
        <span className="form__placeholder">Your Name</span>
        {!errors.name ? (
          <label htmlFor="name" className="form__label">
            To address you :)
          </label>
        ) : (
          <span className="form__error">{errors.name}</span>
        )}
      </div>

      {/* Email Input */}
      <div className="form__group">
        <input
          type="email"
          id="email"
          name="email"
          value={input.email}
          onChange={handleChange}
          className={`form__input ${
            input.email ? 'form__input--not-empty' : ''
          }`}
        />
        <span className="form__placeholder">Email</span>
        {!errors.email ? (
          <label htmlFor="email" className="form__label">
            So I can get in contact with you
          </label>
        ) : (
          <span className="form__error">{errors.email}</span>
        )}
      </div>

      {/* Body Input */}
      <div className="form__group">
        <textarea
          id="body"
          name="body"
          value={input.body}
          onChange={handleChange}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
          }}
          className={`form__textarea ${
            input.body ? 'form__textarea--not-empty' : ''
          }`}
          rows={1}
        />
        <span className="form__placeholder">Tell me your idea</span>
        {!errors.body ? (
          <label htmlFor="body" className="form__label">
            So I put myself in context
          </label>
        ) : (
          <span className="form__error">{errors.body}</span>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="form__button" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default ContactForm;
