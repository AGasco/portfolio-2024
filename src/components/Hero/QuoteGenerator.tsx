import quotes from '@/data/quotes.json';
import { Quote } from '@/types';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const QuoteGenerator = () => {
  const [curQuote, setCurQuote] = useState<Quote | null>(null);
  const [remainingQuotes, setRemainingQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    resetQuotes();
  }, []);

  const generateNewQuote = () => {
    if (remainingQuotes.length === 0) {
      resetQuotes();
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingQuotes.length);
    const newQuote = remainingQuotes[randomIndex];

    setCurQuote(newQuote);
    setRemainingQuotes((prev) =>
      prev.filter((quote) => quote.id !== newQuote.id)
    );
  };

  const resetQuotes = () => {
    const shuffledQuotes = [...quotes].sort(() => Math.random() - 0.5);
    setRemainingQuotes(shuffledQuotes);
    setCurQuote(shuffledQuotes[0]);
  };

  return (
    <div className="quoteGenerator">
      <span className="quoteGenerator__container">
        <div className="quoteGenerator__top">
          <h1>"</h1>
          <p className="quoteGenerator__quote">{curQuote?.quote}</p>
        </div>
        <div className="quoteGenerator__bottom">
          <button onClick={generateNewQuote} className="quoteGenerator__btn">
            <FontAwesomeIcon icon={faArrowsRotate} color="#fff" />
          </button>
          <div className="quoteGenerator__author">
            -{' '}
            {
              <a
                href={curQuote?.wikipedia || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={curQuote?.author === 'Anonymous' ? 'disabled' : ''}
              >
                {curQuote?.author}
              </a>
            }{' '}
            <span className="quoteGenerator__date">
              {curQuote?.date ? '(' + curQuote?.date + ')' : null}
            </span>
          </div>
        </div>
      </span>
    </div>
  );
};

export default QuoteGenerator;
