import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { IoMdExit } from 'react-icons/io';
import Navbar from './Navbar';


const questions = [
    {
        question: "Consider the following system of inequalities: A. y > x + 1  B. y < 10 C. x > 1  Which of the following is NOT in the feasible region of this system?",
        options: ['(2, 4)', '(3, 8)', '(5, 6)', ' (6, 6)'],
        correctAnswer: ' (6, 6)',
    },
    {
        question: 'What symbols are used to represent inequalities?',
        options: ['=', '>=', '<=', '=='],
        correctAnswer: '<=',
    },
    {
        question: 'In the inequality 5x - 3 < 3x + 1, what is the solution for x?',
        options: ['x < -2', 'x > -2', 'x = -2', 'x = 2'],
        correctAnswer: 'x > -2',
    },
    {
        question: 'Which of the following inequalities is not linear?',
        options: ['2x - 3 > 5', '3x^2 + 4x < 10', '4 - x >= 7', '2y + 3x = 8'],
        correctAnswer: '3x^2 + 4x < 10',
    },
];


const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswerClick = (selectedOption) => {
        setSelectedAnswer(selectedOption);
        const currentCorrectAnswer = questions[currentQuestion].correctAnswer;
        if (selectedOption === currentCorrectAnswer) {
            Swal.fire('Correct!', 'Your answer is correct!', 'success');
            setScore((prevScore) => prevScore + 1);
        } else {
            Swal.fire('Incorrect!', 'Your answer is incorrect.', 'error');
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setTimeout(() => {
                const finalScore = score + (selectedOption === currentCorrectAnswer ? 1 : 0);
                Swal.fire({
                    title: 'Quiz Completed!',
                    html: `Your final score: <strong>${finalScore}</strong> out of ${questions.length}`,
                    icon: 'info',
                    confirmButtonText: 'Restart Quiz',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setCurrentQuestion(0);
                        setScore(0);
                        setSelectedAnswer(null);
                    }
                });
            }, 1000);
        }
    };

    const exitQuiz = () => {
        Swal.fire({
            title: 'Are you sure you want to exit?',
            text: 'You will lose all your progress!',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Yes, exit',
            confirmButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                setCurrentQuestion(0);
                setScore(0);
                setSelectedAnswer(null);
            } 
        });
    };

    const renderOptions = () => {
        const options = questions[currentQuestion].options;

        return options.map((option, index) => (
            <>
                <div key={index} className="option">
                    <label>
                        <input
                            type="radio"
                            name="answer"
                            value={option}
                            checked={selectedAnswer === option}
                            onChange={() => handleAnswerClick(option)}
                        />
                        {option}
                    </label>
                </div>
            </>
        ));
    };

    return (
        <>
            <div className="min-h-screen p-10 justify-center">
                <h1 className="text-4xl font-bold mb-4 justify-center text-align-bottom-center">
                    INEQUATIONS IN TWO VARIABLES
                </h1>
                <Navbar />

                <div className="flex items-center justify-center h-screen w-1/2 my-8">
                    <div className="bg-white rounded-lg p-8">
                        <div className="relative">
                            <button className="exit-button absolute top-2 right-2" onClick={exitQuiz} title="Exit">
                                <IoMdExit className="h-6 w-6 text-gray-500" />
                            </button>
                            <h1><strong>Test Yourself</strong></h1>
                            {questions.length > 0 && currentQuestion < questions.length && (
                                <div className="question">
                                    <h6>Question {currentQuestion + 1}</h6>
                                    <br></br>
                                    <h4><p>{questions[currentQuestion].question}</p></h4>
                                    <br></br>
                                    <h5><italic><p>Select the correct answer:</p></italic></h5>
                                    <div className="options">{renderOptions()}</div>
                                    <br></br>
                                    <br></br>
                                    <div class="text-black p-6">


                                    </div>
                                </div>
                            )}
                            {questions.length === 0 || currentQuestion >= questions.length ? (
                                <div className="quiz-completed">
                                    <h2>Quiz completed!</h2>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Quiz;