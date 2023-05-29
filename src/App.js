import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import wordsData from './germanWords.json';
import './FlashCardApp.css';

const FlashCardApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const toggleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  const handleSwipe = () => {
    showRandomWord();
  };

  const handlers = useSwipeable({
    onSwiped: handleSwipe,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const showRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordsData.length);
    setIsRevealed(false);
    setCurrentIndex(randomIndex);
  };

  const cardStyle = isRevealed ? { backgroundColor: '#f8f8f8' } : {};

  return (
    <div>
      <header className="app-header">
        <h1>German Word Viewer</h1>
      </header>
      <div className="flashcard-container" {...handlers}>
        <div className="flashcard" style={cardStyle} onClick={toggleReveal}>
          <h2>{isRevealed ? wordsData[currentIndex].english : wordsData[currentIndex].german}</h2>
        </div>
      </div>
    </div>
  );
};

export default FlashCardApp;
