import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactForm.scss';

interface FormData {
  option: string;
  name: string;
  email: string;
  body: string;
}

interface FormErrors {
  option?: string;
  name?: string;
  email?: string;
  body?: string;
}

const initialState: FormData = {
  option: '',
  name: '',
  email: '',
  body: ''
};

const ContactForm = ({ className }: { className: string }) => {
  const [input, setInput] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [hasSubmitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setSubmitting(true);

      const serviceId = import.meta.env.VITE_API_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_API_EMAILJS_TEMPLATE_ID;
      const userId = import.meta.env.VITE_API_EMAILJS_USER_ID;

      emailjs
        .send(
          serviceId!,
          templateId!,
          {
            option: input.option,
            name: input.name,
            email: input.email,
            body: input.body
          },
          userId!
        )
        .then(() => {
          setSubmitted(true);
        })
        .catch(() => {
          setErrorMessage(
            'Failed to send your message. Please try again later.'
          );
        })
        .finally(() => {
          setSubmitting(false);
          setInput(initialState);
        });
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!input.option) newErrors.option = 'Please select an option';
    if (!input.name) newErrors.name = 'Please provide your name';
    if (!input.email) newErrors.email = 'Please provide your email';
    else if (!validateEmail(input.email))
      newErrors.email = 'Please provide a valid email';
    if (!input.body)
      newErrors.body = 'Please provide some details about your idea/project';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
