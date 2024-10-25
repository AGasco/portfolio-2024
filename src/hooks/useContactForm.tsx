import { useState, ChangeEvent, FormEvent } from 'react';
import emailjs from 'emailjs-com';

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

const useContactForm = () => {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setSubmitting(true);

      const serviceId = import.meta.env.VITE_API_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_API_EMAILJS_TEMPLATE_ID;
      const userId = import.meta.env.VITE_API_EMAILJS_USER_ID;

      try {
        await emailjs.send(
          serviceId!,
          templateId!,
          {
            option: input.option,
            name: input.name,
            email: input.email,
            body: input.body
          },
          userId!
        );
        setSubmitted(true);
      } catch {
        setErrorMessage('Failed to send your message. Please try again later.');
      } finally {
        setSubmitting(false);
        setInput(initialState);
      }
    }
  };

  return {
    input,
    errors,
    isSubmitting,
    hasSubmitted,
    errorMessage,
    handleChange,
    handleSubmit
  };
};

export default useContactForm;
