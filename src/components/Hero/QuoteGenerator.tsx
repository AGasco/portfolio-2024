import { quotes } from '@/data';
import { Quote } from '@/types';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { FadeWrapper } from '../FadeWrapper';
import './QuoteGenerator.scss';

const FADE_DURATION = 2000;
const AUTO_QUOTE_INTERVAL = 8000;

const QuoteGenerator = () => {
  const [curQuote, setCurQuote] = useState<Quote | null>(null);
  const [remainingQuotes, setRemainingQuotes] = useState<Quote[]>([]);
  const [isFading, setFading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    resetQuotes();

    setTimeout(() => {
      setFading(false);
    }, FADE_DURATION);

    startAutoNextQuoteTimer();

    return () => clearAutoNextQuoteTimer();
  }, []);

  const startAutoNextQuoteTimer = () => {
    clearAutoNextQuoteTimer();
    timerRef.current = setTimeout(generateNewQuote, AUTO_QUOTE_INTERVAL);
  };

  const clearAutoNextQuoteTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const generateNewQuote = () => {
    if (remainingQuotes.length === 0) {
      setFading(true);

      setTimeout(() => {
        resetQuotes();
        setFading(false);
        startAutoNextQuoteTimer();
      }, FADE_DURATION);
      return;
    }

    setFading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * remainingQuotes.length);
      const newQuote = remainingQuotes[randomIndex];

      setCurQuote(newQuote);
      setRemainingQuotes((prev) =>
        prev.filter((quote) => quote.id !== newQuote.id)
      );
      setFading(false);
      startAutoNextQuoteTimer();
    }, FADE_DURATION);
  };

  const resetQuotes = () => {
    const shuffledQuotes = [...quotes].sort(() => Math.random() - 0.5);
    const differentQuote =
      shuffledQuotes.find((quote) => quote.id !== curQuote?.id) ||
      shuffledQuotes[0];

    setRemainingQuotes(
      shuffledQuotes.filter((quote) => quote.id !== differentQuote.id)
    );
    setCurQuote(differentQuote);
  };

  const handleManualQuoteChange = () => {
    clearAutoNextQuoteTimer();
    generateNewQuote();
  };

  return (
    <div className="quoteGenerator">
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
