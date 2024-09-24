import { AnimatedLine } from '@/components';
import { useInView } from '@/hooks';
import { useRef } from 'react';
import ContactForm from './ContactForm';
import './Contact.scss';

const triggerPointEnter = window.innerHeight * 0.8;
const triggerPointExit = window.innerHeight - 1000;

const Contact = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, triggerPointEnter, triggerPointExit);

  return (
    <div className="contact">
      <div className="contact__left">
        <div
          className={`contact__title ${isInView ? 'animate' : ''}`}
          ref={titleRef}
        >
          <AnimatedLine animate={isInView} backgroundColor="#000" />
          <h2>Contact</h2>
        </div>
        <div className={`contact__left__content ${isInView ? 'animate' : ''}`}>
          <h1 className="contact__heading">Have I caught your attention?</h1>
          <p className="contact__subheading">
            If so, I would be glad to greet you so we can talk a bit about your
            project, needs and ideas
          </p>
        </div>
      </div>
      <div className="contact__dividerLine"></div>
      <div className="contact__right">
        <ContactForm
          className={`contact__right__content ${isInView ? 'animate' : ''}`}
        />
      </div>
    </div>
  );
};

export default Contact;
