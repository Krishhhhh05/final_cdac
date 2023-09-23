import React, { useState } from 'react';

function Steps() {
  const [currentStep, setCurrentStep] = useState(1);
  const [inputValue, setInputValue] = useState('');
  
  const handleNextStep = () => {
    if (currentStep === 1 && inputValue.trim() !== '') {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2) {
      // Handle other conditions for Step 2, if any
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="Steps">
      <header className="Steps-header">
        <h1>Step-by-Step Steps</h1>
        {currentStep === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter something"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleNextStep} disabled={inputValue.trim() === ''}>
              Next
            </button>
          </>
        )}
        {currentStep === 2 && (
          <>
            <p>Step 2 Content</p>
            <button onClick={handleNextStep}>Next</button>
          </>
        )}
        {currentStep === 3 && (
          <>
            <p>Step 3 Content</p>
            {/* You can add a "Previous" button here if needed */}
          </>
        )}
      </header>
    </div>
  );
}

export default Steps;