import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Multi from './Multi';
import Navbar from './Navbar';
import Region from './Region';
import Swal from 'sweetalert2';

function Workbench() {
  const [step, setStep] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(false);

  const handleNext = () => {
    if (step === 1) { // Check if you are on Step 1 (Multi)
      showSweetAlert();
    } else if (step === 2) { // Check if you are on Step 2 (Region)
      setStep(3); // Move to Step 3
      Swal.fire({
        title: 'Bas ho gaya ab nahi ho rha mere se',
        icon: 'success',
        confirmButtonText: 'Okay'
      });
    } else {
      setStep(step + 1);
    }
  };

  const showSweetAlert = () => {
    Swal.fire({
      title: 'Arbitrary Point Step',
      text: 'Add your arbitrary point instructions here...',
      icon: 'info',
      confirmButtonText: 'Okay'
    }).then((result) => {
      if (result.isConfirmed) {
        setAnswerCorrect(true);
        setStep(2); // Move to Step 2 (Region)
      }
    });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <p>Instructions:</p>
            <p>Add your instructions here...</p>
            <button onClick={handleNext}>Next</button>
          </div>
        );
      case 1:
        return <Multi setAnswerCorrect={setAnswerCorrect} />;
      case 2:
        return <Region setAnswerCorrect={setAnswerCorrect} handleNext={handleNext} />;
      default:
        return <Multi setAnswerCorrect={setAnswerCorrect} />;
    }
  };
  
  return (
    <div className="min-h-screen p-10 justify-center">
      <h1 className="text-4xl font-bold mb-4 justify-center text-align-bottom-center">INEQUATIONS IN TWO VARIABLES</h1>
      <Navbar />
      {renderStep()}
      {answerCorrect && step < 4 && (
        <button onClick={handleNext}>Next</button>
      )}
    </div>
  );
}

export default Workbench;
