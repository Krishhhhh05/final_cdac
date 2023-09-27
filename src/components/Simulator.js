import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Multi from './Multi';
import Navbar from './Navbar';
import Region from './Region';
import Swal from 'sweetalert2';
import Linechart from './Linechart';
import NumberLine from './NumberLine';
import NumRegion from './NumRegion';
import { useNavigate } from 'react-router-dom';

function Workbench() {
    const [step, setStep] = useState(0);
    const [answerCorrect, setAnswerCorrect] = useState(false);
    const totalSteps = 6;
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setProgress((step / totalSteps) * 100);
    }, [step]);

    const handleNext = async () => {
        if (step === 4) {
            if (answerCorrect) {
                await showMultiStepAlert();
            } else {
                Swal.fire('Warning!', `Please provide a correct answer before proceeding.`, 'warning');
            }
        } else if (step === 5) {
            if (answerCorrect) {
                await showRegionStepAlert();
            } else {
                Swal.fire('Warning!', `Please provide a correct answer before proceeding.`, 'warning');
            }
        } else if (step === 6) {
            navigate('/theory'); // Redirect to Theory Page
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
        const nextStep = 5;
        setStep(nextStep);
        setProgress((nextStep / totalSteps) * 100);
    };

    const showRegionStepAlert = async () => {
        await Swal.fire({
            title: 'Horaay!! ',
            text: 'You have completed the expirement',
            icon: 'success',
            confirmButtonText: 'Okay'
        });

        if (answerCorrect) {
            const nextStep = 0;
            setStep(nextStep);
            setProgress((nextStep / totalSteps) * 100);
        } else {
            Swal.fire('Warning!', `Please provide a correct answer before proceeding.`, 'warning');
        }
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <div className="min-h-screen p-10 justify-center">
                        <h1 className="text-4xl font-bold mb-4 text-center">
                            START SIMULATION
                        </h1>
                    </div>
                )
            case 1:
                return <Linechart />;
            case 2:
                return <NumberLine />;
            case 3:
                return <NumRegion />;
            case 4:
                return <Multi setAnswerCorrect={setAnswerCorrect} />;
            case 5:
                return <Region setAnswerCorrect={setAnswerCorrect} handleNext={handleNext} />;
            // case 6:
            //     return <Linechart />;
            default:
                // return <Multi setAnswerCorrect={setAnswerCorrect} />;
                return <Region setAnswerCorrect={setAnswerCorrect} handleNext={handleNext} />;
        }
    };

    return (
        <div className="min-h-screen p-10 justify-center">
            <h1 className="text-4xl font-bold mb-4 justify-center text-align-bottom-center">INEQUATIONS IN TWO VARIABLES</h1>
            <Navbar />
            <div className="bg-gray-300 rounded-lg h-6 mb-4 relative mt-2">
                <div
                    className="h-full bg-blue-500 rounded-lg"
                    style={{ width: `${progress}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                    Step: {step} / 5
                </div>
            </div>

            <div className="bg-gray-200 rounded-lg flex flex-col h-2/3">
                {renderStep()}
                {step===5  &&
                 <div className="flex items-center justify-center h-full">
                 <button
                     type="button"
                     className="btn btn-primary m-2 flex items-center justify-center"
                     onClick={handleNext}
                 >
                     Finish
                 </button>
             </div>}
                
                
                   
             {  ( step ===0 ||step ===1 || step ===2 || step ===3 || step ===4)  &&
            <div className="flex items-center justify-center h-full">
                <button
                    type="button"
                    className="btn btn-primary m-2 flex items-center justify-center"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
} 
            </div>
        </div>
    );
}

export default Workbench;
