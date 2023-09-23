import React, { useState, useEffect, useMemo } from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import Swal from 'sweetalert2';

const Plot = createPlotlyComponent(Plotly);

const Linechart = ({ nextStep }) => {
  // Define the set of predefined target values
  const targetValues = useMemo(() => [-5, 3, 7], []); // Wrap in useMemo to prevent re-rendering

  // Generate x-values from -10 to 10
  const xValues = useMemo(() => Array.from({ length: 21 }, (_, index) => index - 10), []);

  // Create y-values as an array of zeros
  const yValues = useMemo(() => Array(xValues.length).fill(0), [xValues]);

  // State to store the current target value
  const [currentTargetValue, setCurrentTargetValue] = useState(targetValues[0]);

  // State to track the guessed target values
  const [guessedTargets, setGuessedTargets] = useState([]);

  // Function to handle user clicks on the Plotly number line
  const handleNumberLineClick = (event) => {
    const clickedValue = event.points[0].x;

    if (clickedValue === currentTargetValue) {
      Swal.fire({
        title: 'Correct!',
        text: `You selected ${clickedValue}.`,
        icon: 'success',
      }).then(() => {
        // Update the guessedTargets array
        setGuessedTargets([...guessedTargets, currentTargetValue]);

        // Move to the next target value
        const nextTargetIndex = targetValues.indexOf(currentTargetValue) + 1;
        if (nextTargetIndex < targetValues.length) {
          setCurrentTargetValue(targetValues[nextTargetIndex]);
        } else {
          // All targets have been guessed
          Swal.fire({
            title: 'Correct!',
            text: 'right',
            icon: 'success',
          })
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
    <div>
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