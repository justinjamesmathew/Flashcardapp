import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import vocabularyData from './germanWords.json';
import './FlashCardApp.css';

const FlashCardApp = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentWords, setCurrentWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [totalCards, setTotalCards] = useState(0);

  // Initialize the app with categories
  useEffect(() => {
    const categoryList = vocabularyData.map(cat => cat.category);
    setCategories(categoryList);
    
    // Default to first category
    if (categoryList.length > 0) {
      selectCategory(categoryList[0]);
    }
  }, []);

  const selectCategory = (category) => {
    const categoryData = vocabularyData.find(cat => cat.category === category);
    if (categoryData) {
      setSelectedCategory(category);
      setCurrentWords(categoryData.words);
      setTotalCards(categoryData.words.length);
      setCurrentIndex(0);
      setIsRevealed(false);
    }
  };

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
    if (currentWords.length > 0) {
      setCurrentIndex((currentIndex + 1) % currentWords.length);
      setIsRevealed(false);
    }
  };

  const showPreviousWord = () => {
    if (currentWords.length > 0) {
      setCurrentIndex((currentIndex - 1 + currentWords.length) % currentWords.length);
      setIsRevealed(false);
    }
  };

  const cardStyle = isRevealed ? { backgroundColor: '#e6f7ff' } : {};
  const languageFlag = isRevealed ? '🇬🇧' : '🇩🇪';

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>German Flashcards</h1>
      </header>
      
      <div className="category-selector">
        <label htmlFor="category-select">Choose a category:</label>
        <select 
          id="category-select"
          value={selectedCategory || ''}
          onChange={(e) => selectCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      {currentWords.length > 0 ? (
        <>
          <div className="card-counter">
            Card {currentIndex + 1} of {totalCards}
          </div>
          
          <div className="flashcard-container" {...handlers}>
            <button className="nav-button prev-button" onClick={showPreviousWord}>
              &#8592;
            </button>
            
            <div className="flashcard" style={cardStyle} onClick={toggleReveal}>
              <h2>
                {isRevealed 
                  ? currentWords[currentIndex].english 
                  : currentWords[currentIndex].german}
                <span className="language-flag">{languageFlag}</span>
              </h2>
              
              <div className="card-instructions">
                {isRevealed 
                  ? "Click to see German" 
                  : "Click to see English"}
              </div>
            </div>
            
            <button className="nav-button next-button" onClick={showNextWord}>
              &#8594;
            </button>
          </div>
        </>
      ) : (
        <div className="no-cards-message">
          No vocabulary cards available. Please select a category.
        </div>
      )}
    </div>
  );
};

export default FlashCardApp;
