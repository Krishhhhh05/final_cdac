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
      zeroline: false, // Set zeroline to false to remove the vertical line at zero

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
      traceorder: 'normal', // Display legend items in the order they appear in the data array
      font: {
        family: 'Arial, sans-serif',
        size: 7,
        color: 'black',
      },
      // Specify a fixed height for the legend (adjust the height as needed)
      // Note: The height value must include units, e.g., 'px' for pixels
      // You can change the height value to your desired fixed height
      // For example, '150px' for a fixed height of 150 pixels
      height: '400',
    },
  };
  
  

  return (
    <div>
      <h2>Scatter Plot with React and Plotly</h2>
      <div className=''>
        <label>Highlight a Value: </label>
        <input
          type="number"
          min="-10"
          max="10"
          step="0.1"
          onChange={handleInputChange}
          className='m-2 p-2'
        />
      </div>
      <Plot
        data={data}
        layout={graphlayout}
        config={{ displayModeBar: false }}
      />
      
    </div>
  );
};

export default NumberLine;