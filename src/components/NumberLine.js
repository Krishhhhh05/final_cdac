import React, { useState } from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

const NumberLine = ({ onNext }) => {
  const xValues = Array.from({ length: 21 }, (_, index) => index - 10);

  const [highlightedValue, setHighlightedValue] = useState(null);

  const handleInputChange = (event) => {
    const inputValue = parseFloat(event.target.value);
    if (!isNaN(inputValue) && inputValue >= -10 && inputValue <= 10) {
      setHighlightedValue(inputValue);
    } else {
      setHighlightedValue(null);
    }
  };

  const handleNextClick = () => {
    if (highlightedValue !== null) {
      onNext();
    } else {
      alert('Please enter a valid value before proceeding.');
    }
  };

  const highlightIndex = xValues.indexOf(highlightedValue);
  const leftIndices = xValues.slice(0, highlightIndex);
  const rightIndices = xValues.slice(highlightIndex + 1);

  const data = [
    // ... (unchanged)
  ];

  const graphlayout = {
    // ... (unchanged)
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-3 gap-3">
      {/* ... (content for the left grid, unchanged) */}
      <div className="bg-gray-400 p-4 col-span-2 rounded-md">
        <h4 className='flex justify-center items-center'> Visualizing Positive and Pegative values on a numberline</h4>
        <div className='flex justify-center items-center'>
          <label>Highlight a Value: </label>
          <input
            type="number"
            min="-10"
            max="10"
            step="0.1"
            onChange={handleInputChange}
            className='m-2 p-2 rounded-sm'
          />
        </div>
        <div className='w-full flex justify-center'> {/* Maximize width of the graph */}
          <Plot
            data={data}
            layout={graphlayout}
            config={{ displayModeBar: false }}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="btn btn-primary m-2"
            onClick={handleNextClick}
            disabled={highlightedValue === null}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberLine;
