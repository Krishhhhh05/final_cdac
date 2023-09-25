import React, { useState } from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

const NumberLine = () => {
  // Generate x-values from -10 to 10
  const xValues = Array.from({ length: 21 }, (_, index) => index - 10);

  const [highlightedValue, setHighlightedValue] = useState(0);

  // Function to handle user input and highlight the value
  const handleInputChange = (event) => {
    const inputValue = parseFloat(event.target.value);
    if (!isNaN(inputValue) && inputValue >= -10 && inputValue <= 10) {
      setHighlightedValue(inputValue);
    } else {
      setHighlightedValue(null);
    }
  };

  // Calculate indices of points to the left and right of the highlighted value
  const highlightIndex = xValues.indexOf(highlightedValue);
  const leftIndices = xValues.slice(0, highlightIndex);
  const rightIndices = xValues.slice(highlightIndex + 1);

 

  const data = [
    {
      x: leftIndices,
      y: leftIndices.map(() => 0),
      mode: 'markers',
      marker: { size: 10, color: 'red' },
      name: 'Negative Values',
    },
    {
      x: rightIndices,
      y: rightIndices.map(() => 0),
      mode: 'markers',
      marker: { size: 10, color: 'green' },
      name: 'Positive Values',
    },
    {
      x: [highlightedValue],
      y: [0],
      mode: 'markers',
      marker: { size: 20, color: 'blue' },
      name: 'Highlighted Value',
    },
  ];
  
  const graphlayout = {
    xaxis: {
      showgrid: false,
      tickmode: 'array',
      tickvals: xValues,
      ticktext: xValues.map(String),
      zeroline: false, 

    },
    yaxis: {
      showgrid: false,
      zeroline: true,
      zerolinecolor: 'black',
      zerolinewidth: 3,
      showticklabels: false,
    },
    height: 250,
    plot_bgcolor: 'white',
    legend: {
      traceorder: 'normal', 
      font: {
        family: 'Arial, sans-serif',
        size: 12,
        color: 'black',
      },
     
      height: '400',
    },
  };
  
  

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
      </div>
    </div>
  );
};

export default NumberLine;