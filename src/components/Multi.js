import React, { useState, useEffect, useMemo } from 'react';
import Plot from 'react-plotly.js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';

function Multi(props) {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const colors = useMemo(() => ['blue', 'red', 'orange', 'green'], []);
    const [randomColors, setRandomColors] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');

    useEffect(() => {
        const availableColors = [...colors];
        const randomIndex = Math.floor(Math.random() * availableColors.length);
        const correctAnswer = availableColors[randomIndex];

        setCorrectAnswer(correctAnswer);
        availableColors.splice(randomIndex, 1);

        const randomizedColors = [correctAnswer];
        for (let i = 1; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * availableColors.length);
            randomizedColors.push(availableColors[randomIndex]);
            availableColors.splice(randomIndex, 1);
        }
        setRandomColors(randomizedColors);
    }, [colors]);

    function computeY(x, a, b) {
        return a * x + b;
    }

    const x = Array.from({ length: 100 }, (_, i) => i / 10 - 5);

    const y1 = x.map(xVal => computeY(xVal, parseFloat(a), parseFloat(b)));
    const y2 = x.map(xVal => computeY(xVal, -parseFloat(a), -parseFloat(b)));
    const y3 = x.map(xVal => computeY(xVal, parseFloat(a), -parseFloat(b)));
    const y4 = x.map(xVal => computeY(xVal, -parseFloat(a), parseFloat(b)));

    function handleInputChange(event) {
        const { name, value } = event.target;
        if (name === 'a') {
            setA(value);
        } else if (name === 'b') {
            setB(value);
        }
    }

    const navigate = useNavigate();

    async function checkAnswer(color) {
        if (a === '' || b === '') {
            Swal.fire('Enter Values', 'Please enter values for slope and intercept before selecting an option.', 'warning');
            return;
        }
        if (color === correctAnswer) {            
            props.setAnswerCorrect(true);
            Swal.fire('Correct!', `Your answer is correct!`, 'success');
            setA('');
            setB('');

            const availableColors = [...colors];
            const randomIndex = Math.floor(Math.random() * availableColors.length);
            const newCorrectAnswer = availableColors[randomIndex];
            setCorrectAnswer(newCorrectAnswer);
            availableColors.splice(randomIndex, 1);

            const randomizedColors = [newCorrectAnswer];
            for (let i = 1; i < 4; i++) {
                const randomIndex = Math.floor(Math.random() * availableColors.length);
                randomizedColors.push(availableColors[randomIndex]);
                availableColors.splice(randomIndex, 1);
            }
            setRandomColors(randomizedColors);
        } else {
            const result = await Swal.fire({
                icon: 'error',
                title: 'Incorrect!',
                text: `Your answer is incorrect. What would you like to do?`,
                showCancelButton: true,
                confirmButtonText: 'Retry',
            });
            if (result.isConfirmed) {
                navigate('/theory1');
            }
        }
    }

    return (
        <>
            <div className='App'>
                < div class="flex m-2 justify-start items-center h-screen">

                    <div class="px-6">
                        <div className="mr-16 fixed-left my-45 float-right border-2 w-2/3 p-4 border-b-4 border-gray-200 rounded-xl bg-gray-50">
                            <h1 className="font-bold text-lg text-center"><br />Plotting the Equation</h1>
                            <br />
                            <div className="font-light">
                                Here the equation is in the form of      <b><br />Y = mX + C</b>
                                <br />
                                <br />
                                Enter the values and select which line correctly plots the equation.
                            </div>
                            <div className="" id="input">
                                <div className="a" ID="INPUT"><br />
                                    <label htmlFor="a">Enter the slope: </label>
                                    <input
                                        className="bg-white rounded-full mx-6 my-6 px-3"
                                        id="a"
                                        name="a"
                                        type="text"
                                        placeholder='Enter Slope'
                                        value={a}
                                        onChange={handleInputChange}
                                    />
                                    <br />
                                    <label htmlFor="b">Enter the Intercept: </label>
                                    <input
                                        className="bg-white rounded-full mx-6 my-6 px-3"
                                        id="b"
                                        name="b"
                                        type="text"
                                        placeholder='Enter Intercept'
                                        value={b}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <br />
                                <div className="flex justify-align">
                                    {randomColors.map((color, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`btn ${color === correctAnswer ? 'btn-success' : 'btn-danger'} mx-2`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => checkAnswer(color)}
                                        >
                                            {color.charAt(0).toUpperCase() + color.slice(1)}
                                        </button>
                                    ))}
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>

                    <div id="graph" className="float-left ml-5 px-4 my-4">
                        <Plot
                            data={[
                                {
                                    x: x,
                                    y: y1,
                                    type: 'scatter',
                                    mode: 'lines',
                                    name: randomColors[0],
                                    line: { color: randomColors[0] },
                                },
                                {
                                    x: x,
                                    y: y2,
                                    type: 'scatter',
                                    mode: 'lines',
                                    name: randomColors[1],
                                    line: { color: randomColors[1] },
                                },
                                {
                                    x: x,
                                    y: y3,
                                    type: 'scatter',
                                    mode: 'lines',
                                    name: randomColors[2],
                                    line: { color: randomColors[2] },
                                },
                                {
                                    x: x,
                                    y: y4,
                                    type: 'scatter',
                                    mode: 'lines',
                                    name: randomColors[3],
                                    line: { color: randomColors[3] },
                                },
                            ]}
                            layout={{
                                width: 700,
                                height: 500,
                                title: 'Line Plot',
                                xaxis: { title: 'X Axis' },
                                yaxis: { title: 'Y Axis' },
                                showlegend: false,
                            }}
                            config={{ displayModeBar: false }}
                        />
                    </div>
                </div >
            </div>
        </>
    );
}
export default Multi
