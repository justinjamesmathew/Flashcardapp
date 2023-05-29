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

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      showPreviousWord();
    } else if (direction === 'right') {
      showNextWord();
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const showNextWord = () => {
    setCurrentIndex((currentIndex + 1) % wordsData.length);
    setIsRevealed(false);
  };

  const showPreviousWord = () => {
    setCurrentIndex((currentIndex - 1 + wordsData.length) % wordsData.length);
    setIsRevealed(false);
  };

  const cardStyle = isRevealed ? { backgroundColor: '#f8f8f8' } : {};
  const languageFlag = isRevealed ? '🇬🇧' : '🇩🇪';

  return (
    <div>
      <header className="app-header">
        <h1>German Word Viewer</h1>
      </header>
      <div className="flashcard-container" {...handlers}>
        <div className="flashcard" style={cardStyle} onClick={toggleReveal}>
          <h2>
            {isRevealed ? wordsData[currentIndex].english : wordsData[currentIndex].german}
            <span className="language-flag">{languageFlag}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default FlashCardApp;
