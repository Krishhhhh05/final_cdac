import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const Region = (props) => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [plotData, setPlotData] = useState(null);

    const handlePlot = () => {
        if (a === '' || b === '' || c === '' || isNaN(a) || isNaN(b) || isNaN(c)) {
            Swal.fire('Missing Values', 'Please enter values for slope and intercept before selecting an option.', 'warning');
            return;
        }
        const x = [-10, 10];
        const y1 = x.map((xVal) => (-a * xVal - c) / b);

        const lineTrace = {
            x: x,
            y: y1,
            mode: 'lines',
            name: 'Line',
        };
        const plotData = [lineTrace];
        if (a * x[0] + b * y1[0] + c < 0 && a * x[1] + b * y1[1] + c > 0) {
            const positiveRegion1 = {
                x: [x[0], x[1], x[1], x[0]],
                y: [y1[0], y1[1], 10, 10],
                fill: 'toself',
                fillcolor: 'rgba(0, 255, 0, 0.3)',
                mode: 'none',
                name: 'Region 1',
            };
            plotData.push(positiveRegion1);
            const negativeRegion1 = {
                x: [x[0], x[1], x[1], x[0]],
                y: [y1[0], y1[1], -10, -10],
                fill: 'toself',
                fillcolor: 'rgba(255, 0, 0, 0.3)',
                mode: 'none',
                name: 'Region 2',
            };
            plotData.push(negativeRegion1);
        } else {
            const positiveRegion2 = {
                x: [x[0], x[1], x[1], x[0]],
                y: [y1[0], y1[1], -10, -10],
                fill: 'toself',
                fillcolor: 'rgba(0, 255, 0, 0.3)',
                mode: 'none',
                name: 'Region 2',
            };
            plotData.push(positiveRegion2);
            const negativeRegion2 = {
                x: [x[0], x[1], x[1], x[0]],
                y: [y1[0], y1[1], 10, 10],
                fill: 'toself',
                fillcolor: 'rgba(255, 0, 0, 0.3)',
                mode: 'none',
                name: 'Region 1',
            };
            plotData.push(negativeRegion2);
        }

        setPlotData(plotData);
    };

    const checkred = async () => {
        if (a === '' || b === '' || c === '' || isNaN(a) || isNaN(b) || isNaN(c)) {
            Swal.fire('Missing Values', 'Please enter values for slope and intercept before selecting an option.', 'warning');
            return;
        }
        if (a > 0 && b > 0 && c > 0) {
            props.setAnswerCorrect(true);
            await Swal.fire('Correct!', `Your answer is correct!`, 'success');
            setA('');
            setB('');
            setC('');
        } else {
            props.setAnswerCorrect(false);
            await Swal.fire({
                icon: 'error',
                title: 'Incorrect!',
                text: `Your answer is incorrect. Please provide the correct answer.`,
                confirmButtonText: 'OK',
            });
        }
    }

    const checkgreen = async () => {
        if (a === '' || b === '' || c === '' || isNaN(a) || isNaN(b) || isNaN(c)) {
            Swal.fire('Missing Values', 'Please enter values for slope and intercept before selecting an option.', 'warning');
            return;
        }
        if (a < 0 || b < 0 || c < 0) {
            props.setAnswerCorrect(true);
            await Swal.fire('Correct!', `Your answer is correct!`, 'success');
            setA('');
            setB('');
            setC('');
        } else {
            props.setAnswerCorrect(false);
            await Swal.fire({
                icon: 'error',
                title: 'Incorrect!',
                text: `Your answer is incorrect. Please provide the correct answer.`,
                confirmButtonText: 'OK',
            });
        }
    }

    const layout = {
        title: 'Line Plot',
        xaxis: {
            title: 'X-axis',
            range: [-10, 10],
            tickmode: 'linear',
            dtick: 1,
        },
        yaxis: {
            title: 'Y-axis',
            range: [-10, 10],
            tickmode: 'linear',
            dtick: 1,
        },
        showlegend: false,
    };

    // const navigate = useNavigate();

    return (
        <>
            <div className='App'>
                <div className="flex m-2 justify-start items-center h-screen">
                    <div id="input" className="ml-6 mr-6 top-4 fixed-left float-right border-2 w-1/3 p-4 border-b-4 border-gray-200 rounded-xl bg-gray-50">
                        <h1 className="font-bold text-lg text-center">Shading the region</h1>
                        <br />Here we use the equation-
                        <img src="../assets/main.png" alt="main_eq" style={{ align: 'center', width: '70%', height: '2%', }}></img>
                        The entire graph is divided into 2 parts and shaded positive or negative according to the equation.
                        Identify the Region which represents the positive region i.e. <br /><b>a</b> 0
                        <br /><br />
                    </div>

                    <Plot className="float-left ml-5 px-4 my-4"
                        data={plotData}
                        layout={layout}
                        config={{ displayModeBar: false }}
                        style={{ width: '700px', height: '500px' }}
                    />

                    {plotData && (
                        <div id="graph" className="float-left ml-5 px-4 my-4">
                        </div>
                    )}

                    <div id="input" className="ml-6 mr-6 top-4 fixed-left float-right border-2 w-1/3 p-4 border-b-4 border-gray-200 rounded-xl bg-gray-50">
                        <h1 className="font-bold text-lg text-center"><br />Input</h1>
                        <label>
                            a:
                            <input className='bg-white rounded-full mx-2 my-6 px-3'
                                type="number"
                                value={a}
                                placeholder='Enter A'
                                onChange={(event) => setA(event.target.value)}
                            />
                        </label>
                        <label>
                            b:
                            <input className='bg-white rounded-full mx-2 my-6 px-3'
                                type="number"
                                value={b}
                                placeholder='Enter B'
                                onChange={(event) => setB(event.target.value)}
                            />
                        </label>
                        <label>
                            c:
                            <input className='bg-white rounded-full mx-2 my-6 px-3'
                                type="number"
                                value={c}
                                placeholder='Enter C'
                                onChange={(event) => setC(event.target.value)}
                            />
                        </label>
                        <br />
                        <button className="btn btn-lg btn-primary mx-8 my-8" onClick={handlePlot}>Plot</button>
                        <div className='flex justify-align' style={{ alignItems: 'center' }}>
                            <button type="button" className="btn btn-danger mr-12 ml-12" onClick={checkred}>Red</button>
                            <button type="button" className="btn btn-success mr-12 ml-12" onClick={checkgreen}>Green</button>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Region;
