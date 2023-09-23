import React, { useState, useEffect, useMemo } from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import Swal from 'sweetalert2';

const Plot = createPlotlyComponent(Plotly);

const Linechart = ({ onNext }) => {
  const targetValues = useMemo(() => {
    const randomValues = [];
    while (randomValues.length < 3) {
      const randomValue = Math.floor(Math.random() * 21) - 10;
      if (!randomValues.includes(randomValue)) {
        randomValues.push(randomValue);
      }
    }
    return randomValues;
  }, []);

  const xValues = useMemo(() => Array.from({ length: 21 }, (_, index) => index - 10), []);
  const yValues = useMemo(() => Array(xValues.length).fill(0), [xValues]);

  const [currentTargetValue, setCurrentTargetValue] = useState(targetValues[0]);
  const [guessedTargets, setGuessedTargets] = useState([]);
  const [correctGuessCount, setCorrectGuessCount] = useState(0);

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
        setCorrectGuessCount(correctGuessCount + 1);
      });
    } else {
      Swal.fire({
        title: 'Incorrect!',
        text: 'Try again.',
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    setCurrentTargetValue(targetValues[0]);
  }, [targetValues]);

  useEffect(() => {
    if (correctGuessCount === 3) {
      onNext(); // Notify parent component that targets are guessed correctly
    }
  }, [correctGuessCount, onNext]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 p-3 gap-3">
      {/* Left grid (gray) */}
      <div className="bg-gray-300 p-4 rounded-md">
        {/* Content for the left grid */}
        <div className='p-4'>
          <h4> Instructions</h4>
          <p>
          <ul class="list-disc">
            <li> Correctly choose the target values</li>
          </ul>
          </p>
        </div>
      </div>

      <div className="bg-gray-400 p-4 col-span-2 rounded-md">
        {/* Content for the second right grid */}
        <h2>Click on the Number Line</h2>
      {currentTargetValue && 
      <div className='flex items-center'>
        Target Value: 
       <div className='bg-sky-500/75 shrink m-2 rounded-full p-3 text-white'>    {currentTargetValue}</div>
        
        </div >}
      <div>
        <p>Click on the number line to select a value:</p>
        <Plot
          data={[
            {
              x: xValues,
              y: yValues,
              type: 'scatter',
              mode: 'markers',
              marker: { size: 20, color: 'blue' },
            },
          ]}
          layout={{
            xaxis: {
              showgrid: false,
              tickmode: 'array',
              tickvals: Array.from({ length: 21 }, (_, index) => index - 10),
              ticktext: Array.from({ length: 21 }, (_, index) => index - 10).map(String),
              title: 'Values'
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

export default Linechart;
