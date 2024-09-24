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

const initialState: FormData = {
  option: '',
  name: '',
  email: '',
  body: ''
};

const ContactForm = ({ className }: { className: string }) => {
  const [input, setInput] = useState<FormData>(initialState);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // TODO Send email with formData
  };

  return (
    <form onSubmit={handleSubmit} className={`form ${className}`}>
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

        <label htmlFor="option" className="form__label">
          Select one of the options
        </label>
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
        <label htmlFor="name" className="form__label">
          To address you :)
        </label>
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
        <label htmlFor="email" className="form__label">
          So I can get in contact with you
        </label>
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
        <label htmlFor="body" className="form__label">
          So I put myself in context
        </label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="form__button">
        Send
      </button>
    </form>
  );
};

export default ContactForm;
