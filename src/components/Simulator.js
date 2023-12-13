import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Multi from './Multi';
import Navbar from './Navbar';
import Region from './Region';
import Swal from 'sweetalert2';
import Linechart from './Linechart';
import NumberLine from './NumberLine';
import { useNavigate } from 'react-router-dom';

function Simulator() {
    const [step, setStep] = useState(0);
    const [answerCorrect, setAnswerCorrect] = useState(false);
    const totalSteps = 5;
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const [correctGuesses, setCorrectGuesses] = useState(0);
    const [inputProvided, setInputProvided] = useState(false);


    useEffect(() => {
        setProgress((step / totalSteps) * 100);
    }, [step]);

    const handleNext = async () => {
        if (step === 3) {
            if (answerCorrect) {
                // await showMultiStepAlert();
                setStep(step + 1);
            } else {
                Swal.fire('Warning!', `Please provide a correct answer before proceeding.`, 'warning');
            }
        } else if (step === 4) {
            if (answerCorrect) {
                await showRegionStepAlert();
            } else {
                Swal.fire('Warning!', `Please provide a correct answer before proceeding.`, 'warning');
            }
        } else if (step === 5) {
            navigate('/theory');
        } else {
            if (step === 0) {
                setStep(step + 1);
            } else if (step === 1 && correctGuesses < 3) {
                Swal.fire('Warning!', 'Please guess three values before proceeding.', 'warning');
            } else if (step === 1 && correctGuesses >= 3) {
                setStep(step + 1);
            } else if (step === 2) {
                if (inputProvided) {
                    setStep(step + 1);
                } else {
                    Swal.fire('Warning!', 'Please provide an input value before proceeding.', 'warning');
                }
            }
            else {
                setStep(step + 1);
            }
        }
    };

    // const showMultiStepAlert = async () => {
    //     await Swal.fire({
    //         title: 'Arbitrary Point Step',
    //         text: 'Add your arbitrary point instructions here...',
    //         icon: 'info',
    //         confirmButtonText: 'Okay'
    //     });

    //     setAnswerCorrect(true);
    //     const nextStep = 5;
    //     setStep(nextStep);
    //     setProgress((nextStep / totalSteps) * 100);
    // };

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
                        <div className="min-h-screen p-10 justify-center">
                            <h1 className="text-4xl font-bold mb-4 text-center">
                                Graphical representation of Ax+By+C{'>'}0
                            </h1>
                            <center>
                                <h2><b>Objective:</b></h2>
                                <h4>To plot the section represented by Ax+By+C{'>'}0 on a graph.</h4>
                                <br></br>
                                <br></br>

                                <h2><b>Learning Outcome:</b></h2>
                                <h4>Students will be able to identify the section on the graph that represents the given inequality of the type Ax+By+C{'>'}0.</h4>
                                <br></br>
                                <br></br>

                                <h4>With the help of the following steps we will be learning how to plot the section represented by Ax+By+C{'>'}0 on a graph:</h4>
                                <br></br>
                                <br></br>
                            </center>
                        </div>
                    </div>
                )
            case 1:
                return <Linechart nextStep={handleNext} correctGuesses={correctGuesses} setCorrectGuesses={setCorrectGuesses} />;
            case 2:
                return <NumberLine onInputProvided={() => setInputProvided(true)} />
            // case 3:
            //     return <NumRegion />;
            case 3:
                return <Multi setAnswerCorrect={setAnswerCorrect} />;
            case 4:
                return <Region onClick={handleNext} disabled={!answerCorrect} />;
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

                {step === 4 &&
                    <div className="flex items-center justify-center h-full">
                        <button
                            type="button"
                            className="btn btn-primary m-2 flex items-center justify-center"
                            onClick={handleNext}
                            disabled={!answerCorrect}
                        >
                            Finish
                        </button>
                    </div>}

                {(step === 0 || step === 1 || step === 2 || step === 3) &&
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

export default Simulator;