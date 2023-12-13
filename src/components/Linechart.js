import React, { useState, useMemo } from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import Swal from 'sweetalert2';

const Plot = createPlotlyComponent(Plotly);

const Linechart = ({ nextStep, correctGuesses, setCorrectGuesses }) => {

  const generateRandomUniqueValue = (min, max, exclude) => {
    let randomValue;
    do {
      randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (exclude.includes(randomValue) || randomValue === 0);
    return randomValue;
  };

  const targetValues = useMemo(() => {
    const values = [];
    while (values.length < 3) {
      const randomValue = generateRandomUniqueValue(-10, 10, values);
      values.push(randomValue);
    }
    return values;
  }, []);

  const xValues = useMemo(() => Array.from({ length: 21 }, (_, index) => index - 10), []);

  const yValues = useMemo(() => Array(xValues.length).fill(0), [xValues]);

  const [currentTargetValue, setCurrentTargetValue] = useState(targetValues[0]);

  const [guessedTargets, setGuessedTargets] = useState([]);

  const handleNumberLineClick = (event) => {
    const clickedValue = event.points[0].x;

    if (clickedValue === currentTargetValue) {
      Swal.fire({
        title: 'Correct Answer!',
        icon: 'success',
      }).then(() => {
        setGuessedTargets([...guessedTargets, currentTargetValue]);

        const nextTargetIndex = targetValues.indexOf(currentTargetValue) + 1;
        if (nextTargetIndex < targetValues.length) {
          setCurrentTargetValue(targetValues[nextTargetIndex]);
        }

        setCorrectGuesses(prevCorrectGuesses => prevCorrectGuesses + 1);
        if (correctGuesses >= 3) {
          Swal.fire({
            title: 'You can now move ahead!',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.isConfirmed) {
              nextStep();
            }
          });
        }
      });
    } else {
      const message = clickedValue < currentTargetValue
        ? `Shift to the RIGHT.`
        : `Shift to the LEFT.`;

      Swal.fire({
        title: 'Incorrect Answer!',
        text: message,
        icon: 'error',
      });
    }
  };

  const numberLineData = [
    {
      x: xValues,
      y: yValues,
      type: 'scatter',
      mode: 'markers',
      marker: { size: 20, color: 'blue' },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-3 gap-3">
      <div className="bg-gray-300 p-4 rounded-md">
        <div className='p-4'>
          <h4 className='flex justify-center items-center'>Instructions</h4>
          <p>
            <ul class="list-disc">
              <li>On the number line you can see the different numbers have been plotted. You have to guess the position of 3 given target values.</li>
              <li>Click on the blue point on the number line that represents the targeted value.</li>
            </ul>
          </p>
        </div>
      </div>
      <div className="bg-gray-400 p-4 col-span-2 rounded-md">

        <h2><center>Number Line</center></h2>
        {currentTargetValue &&
          <div className='flex items-center'>
            Target Value:
            <div className='bg-sky-500/75 shrink m-2 rounded-full p-3 text-white'>    {currentTargetValue}</div>

          </div >}
        <div>
          <p>Click on the point on the number line to select a value:</p>
          <div className='flex justify-center items-center'>
            <Plot
              data={numberLineData}
              layout={{
                ...layout,
                xaxis: { ...layout.xaxis, title: 'Values' },
              }}
              config={{ displayModeBar: false }}
              onClick={handleNumberLineClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const layout = {
  xaxis: {
    showgrid: false,
    tickmode: 'array',
    tickvals: Array.from({ length: 21 }, (_, index) => index - 10),
    ticktext: Array.from({ length: 21 }, (_, index) => index - 10).map(String),
  },
  yaxis: {
    showgrid: false,
    zeroline: true,
    zerolinecolor: 'black',
    zerolinewidth: 3,
    showticklabels: false,
  },
  height: 200,
  plot_bgcolor: 'white',
};

export default Linechart;