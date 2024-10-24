import { quotes } from '@/data';
import { Quote } from '@/types';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { FadeWrapper } from '../FadeWrapper';
import './QuoteGenerator.scss';

const FADE_DURATION = 2000;
const AUTO_QUOTE_INTERVAL = 8000;

const QuoteGenerator = ({ isLoaded }: { isLoaded: boolean }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const cycleOrderRef = useRef<Quote[]>([]);

  const [curQuote, setCurQuote] = useState<Quote | null>(null);
  const [remainingQuotes, setRemainingQuotes] = useState<Quote[]>([]);
  const [isFading, setFading] = useState(true);

  useEffect(() => {
    const jobsQuote = quotes.find((quote) => quote.author === 'Steve Jobs')!;
    const otherQuotes = quotes.filter(
      (quote) => quote.author !== 'Steve Jobs'
    )!;
    const shuffledQuotes = [...otherQuotes].sort(() => Math.random() - 0.5);

    cycleOrderRef.current = [jobsQuote, ...shuffledQuotes];
    setCurQuote(jobsQuote);
    setRemainingQuotes([...shuffledQuotes]);

    const fadeTimeout = setTimeout(() => {
      setFading(false);
    }, FADE_DURATION);

    startAutoNextQuoteTimer();

    return () => {
      clearTimeout(fadeTimeout);
      clearAutoNextQuoteTimer();
    };
  }, []);

  const startAutoNextQuoteTimer = () => {
    clearAutoNextQuoteTimer();
    timerRef.current = setTimeout(generateNewQuote, AUTO_QUOTE_INTERVAL);
  };

  const clearAutoNextQuoteTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const generateNewQuote = () => {
    setFading(true);

    setTimeout(() => {
      if (remainingQuotes.length === 0) {
        setCurQuote(cycleOrderRef.current[0]);
        setRemainingQuotes([...cycleOrderRef.current.slice(1)]);
      } else {
        const nextQuote = remainingQuotes[0];
        setCurQuote(nextQuote);
        setRemainingQuotes((prev) => prev.slice(1));
      }

      setFading(false);
      startAutoNextQuoteTimer();
    }, FADE_DURATION);
  };

  const handleManualQuoteChange = () => {
    clearAutoNextQuoteTimer();
    generateNewQuote();
  };

  return (
    <div className={`quoteGenerator ${isLoaded ? 'animate' : ''}`}>
      <FadeWrapper isFadingOut={isFading} duration={FADE_DURATION}>
        <span className="quoteGenerator__container">
          <div className="quoteGenerator__image-container">
            {curQuote?.image && (
              <img
                src={curQuote.image}
                alt={`${curQuote?.author}'s portrait`}
                className="quoteGenerator__image"
              />
            )}
          </div>
          <div className="quoteGenerator__top">
            <p className="quoteGenerator__quote">{curQuote?.quote}</p>
          </div>

          {curQuote && (
            <div key={curQuote.id} className="quoteGenerator__timer" />
          )}

          <div className="quoteGenerator__bottom">
            <button
              onClick={handleManualQuoteChange}
              className="quoteGenerator__btn"
              disabled={isFading}
            >
              <FontAwesomeIcon icon={faArrowsRotate} color="#fff" />
            </button>
            <div className="quoteGenerator__author">
              <a
                href={curQuote?.wikipedia || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={curQuote?.author === 'Anonymous' ? 'disabled' : ''}
              >
                {curQuote?.author}
              </a>{' '}
              <p className="quoteGenerator__date">
                {curQuote?.date ? `(${curQuote?.date})` : '\u00A0'}
              </p>
            </div>
          </div>
        </span>
      </FadeWrapper>
    </div>
  );
};

export default QuoteGenerator;
