import React, { useState, useEffect, useMemo } from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import Swal from 'sweetalert2';

const Plot = createPlotlyComponent(Plotly);

const Linechart = ({ nextStep }) => {
  const generateRandomUniqueValue = (min, max, exclude) => {
    let randomValue;
    do {
      randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (exclude.includes(randomValue));
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
        title: 'Correct!',
        text: `You selected ${clickedValue}.`,
        icon: 'success',
      }).then(() => {
        setGuessedTargets([...guessedTargets, currentTargetValue]);

        const nextTargetIndex = targetValues.indexOf(currentTargetValue) + 1;
        if (nextTargetIndex < targetValues.length) {
          setCurrentTargetValue(targetValues[nextTargetIndex]);
        } 
      });
    } else {
      Swal.fire({
        title: 'Incorrect!',
        text: 'Try again.',
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

  useEffect(() => {
    setCurrentTargetValue(targetValues[0]);
  }, [targetValues]); // Include targetValues in the dependency array

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-3 gap-3">
      <div className="bg-gray-300 p-4 rounded-md">
        <div className='p-4'>
          <h4 className='flex justify-center items-center'>Instructions</h4>
          <p>
            <ul class="list-disc">
              <li>Enter any value from the number appearing in the graph in the input box</li>
              <li>You can now see the poitive and negative values respectively</li>
            </ul>
          </p>
        </div>
      </div>
      <h2>Click on the Number Line</h2>
      {currentTargetValue && <p>Target Value: {currentTargetValue}</p>}
      <div>
        <p>Click on the number line to select a value:</p>
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