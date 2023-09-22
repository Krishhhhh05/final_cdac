import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Multi from './Multi';
import Navbar from './Navbar';
import Region from './Region';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

function Workbench() {
  const [step, setStep] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const navigate = useNavigate();

  const handleNext = async () => {
    if (step === 1) {
      if (answerCorrect) {
        await showMultiStepAlert();
      } else {
        alert('Please provide a correct answer before proceeding.');
      }
    } else if (step === 2) {
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
    setStep(2);
  };

  const showRegionStepAlert = async () => {
    await Swal.fire({
      title: 'Region Step',
      text: 'This is the next region alert.',
      icon: 'info',
      confirmButtonText: 'Okay'

    });
    if (answerCorrect) {
      setStep(0);
    } else {
      alert('Please provide a correct answer before proceeding.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <p>Instructions:</p>
            <p>Add your instructions here...</p>
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
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default Workbench;
