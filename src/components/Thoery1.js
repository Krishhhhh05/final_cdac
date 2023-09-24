import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Multi from './Multi';
import Navbar from './Navbar';
import Region from './Region';
import Swal from 'sweetalert2';
import Linechart from './Linechart';
import NumberLine from './NumberLine';
import NumRegion from './NumRegion';

function Workbench() {
  const [step, setStep] = useState(1);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [highlightedValue, setHighlightedValue] = useState(null);

  const handleNextClick = ({ onNext }) => {
    if (highlightedValue !== null) {
      onNext();
    } else {
      alert('Please enter a valid value before proceeding.');
    }
  };

  const handleInputChange = (event) => {
    const inputValue = parseFloat(event.target.value);
    if (!isNaN(inputValue) && inputValue >= -10 && inputValue <= 10) {
      setHighlightedValue(inputValue);
    } else {
      setHighlightedValue(null);
    }
  };

  const handleNext = async () => {
    if (step === 4) {
      if (answerCorrect) {
        await showMultiStepAlert();
      } else {
        alert('Please provide a correct answer before proceeding.');
      }
    } else if (step === 5) {
      if (answerCorrect) {
        await showRegionStepAlert();
      } else {
        alert('Please provide a correct answer before proceeding.');
      }
    } else {
      setStep(step + 1);
    }
  };

  const showMultiStepAlert = async () => {
    await Swal.fire({
      title: 'Arbitrary Point Step',
      text: 'Add your arbitrary point instructions here...',
      icon: 'info',
      confirmButtonText: 'Okay'
    });

    setAnswerCorrect(true);
    setStep(5);
  };

  const showRegionStepAlert = async () => {
    await Swal.fire({
      title: 'Region Step',
      text: 'This is the next region alert.',
      icon: 'info',
      confirmButtonText: 'Okay'
    });

    if (answerCorrect) {
      setStep(5);
    } else {
      alert('Please provide a correct answer before proceeding.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Linechart onNext={handleNext} completed={answerCorrect} />;
      case 2:
        return <NumberLine onNext={handleNext} />;
      case 3:
        return <NumRegion onNext={handleNext} />;
      case 4:
        return <Multi setAnswerCorrect={setAnswerCorrect} />;
      case 5:
        return <Region setAnswerCorrect={setAnswerCorrect} handleNext={handleNext} />;
      case 6:
        return <Linechart onNext={handleNext} completed={answerCorrect} />;
      default:
        return <Multi setAnswerCorrect={setAnswerCorrect} />;
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen p-10 justify-center">
      <h1 className="text-4xl font-bold mb-4 justify-center text-align-bottom-center">
        INEQUATIONS IN TWO VARIABLES
      </h1>
      <Navbar />
      <div className="bg-gray-200 rounded-lg flex flex-col h-2/3">
        <div>{renderStep()}</div>
        {(step === 1) && (
          <div className="flex items-center justify-center h-full">
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={handleNextClick}
              disabled={highlightedValue === null}
            >
              Next
            </button>
          </div>
        )}
        {(step === 2 || step === 3) && (
          <div className="flex items-center justify-center h-full">
            <button
              type="button"
              className="btn btn-primary m-2 flex items-center justify-center"
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        )}
        {(step === 4 || step === 5) && (
          <div className="flex items-center justify-center h-full">
            <button
              type="button"
              className="btn btn-primary m-2 flex items-center justify-center"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workbench;
