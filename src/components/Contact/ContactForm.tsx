import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useState } from 'react';
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
      console.log('Form submitted:', input);
      // TODO Send email with formData
      // TODO Render a confirmation screen
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

  return (
    <form onSubmit={handleSubmit} className={`form ${className}`} noValidate>
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
          <option value="1">Jimi 1</option>
          <option value="2">Pepe 2</option>
          <option value="3">Jaime 3</option>
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
      <button type="submit" className="form__button">
        Send
      </button>
    </form>
  );
};

export default ContactForm;
