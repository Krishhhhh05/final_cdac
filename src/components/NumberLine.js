import React, { useState } from 'react';
import Plotly from 'plotly.js-basic-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
import Swal from 'sweetalert2';

const Plot = createPlotlyComponent(Plotly);

const NumberLine = () => {
  const xValues = Array.from({ length: 21 }, (_, index) => index - 10);

  const [highlightedValue, setHighlightedValue] = useState(0);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
  
    if (/^[0-9]+$/.test(inputValue)) {
      const numericValue = parseInt(inputValue, 10);
  
      if (numericValue >= -10 && numericValue <= 10) {
        setHighlightedValue(numericValue);
      } else {
        Swal.fire({
          title: 'Invalid Input',
          text: 'Please enter an integer between -10 and 10',
          icon: 'error',
        });
      }
    } else {
      Swal.fire({
        title: 'Invalid Input',
        text: 'Please enter a valid integer',
        icon: 'error',
      });
    }
  };
  
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
            step="1"
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