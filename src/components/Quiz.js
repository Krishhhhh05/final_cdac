import React, { useState } from 'react';
import Swal from 'sweetalert2';
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
    const [answers, setAnswers] = useState(Array(questions.length).fill(''));
    const [showAnswers, setShowAnswers] = useState(false);

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleRetry = () => {
        setAnswers(Array(questions.length).fill(''));
        setShowAnswers(false);
    };

    const handleSubmit = () => {
        const score = answers.reduce((acc, answer, index) => {
            return answer === questions[index].correctAnswer ? acc + 1 : acc;
        }, 0);

        Swal.fire({
            title: 'Quiz Completed!',
            html: `Your final score: <strong>${score}</strong> out of ${questions.length}`,
            icon: 'info',
            showCancelButton: true,
            cancelButtonText: 'Show Answers',
            confirmButtonText: 'Retry Quiz', // Change the text for the retry button
        }).then((result) => {
            if (result.isConfirmed) {
                handleRetry(); // Call the handleRetry function
            } else {
                setShowAnswers(true);
            }
        });
    };

    return (
        <div className="min-h-screen p-10 justify-center">
            <h1 className="text-4xl font-bold mb-4 justify-center text-align-bottom-center">
                INEQUATIONS IN TWO VARIABLES
            </h1>
            <Navbar />
            <div className="bg-white rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-4">Test Yourself</h1>

                {questions.map((question, index) => (
                    <div key={index} className="mb-6">
                        <h3 className="mb-2">Question {index + 1}</h3>
                        <p>{question.question}</p>

                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="mb-2">
                                <label>
                                    <input
                                        type="radio"
                                        name={`answer-${index}`}
                                        value={option}
                                        checked={answers[index] === option}
                                        onChange={() => handleAnswerChange(index, option)}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}

                        {showAnswers && (
                            <div className="mt-2">
                                <p className={answers[index] === question.correctAnswer ? 'text-green-500' : 'text-red-500'}>
                                    Your Answer: {answers[index]}
                                </p>
                                <p>Correct Answer: {question.correctAnswer}</p>
                            </div>
                        )}
                    </div>
                ))}

                <div className="flex justify-center mt-4">
                    {showAnswers ? (
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRetry}>
                            Retry Quiz
                        </button>
                    ) : (
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                            Submit
                        </button>
                    )}
                </div>

                {showAnswers && (
                    <div className="flex justify-center mt-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowAnswers(false)}>
                            Hide Answers
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;