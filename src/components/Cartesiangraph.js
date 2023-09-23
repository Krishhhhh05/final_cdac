import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

function Cartesiangraph() {
  // State to store the selected point's coordinates
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Data for the graph
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Example Dataset',
        data: [65, 59, 80, 81, 56],
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
    ],
  };

  // Options for the graph
  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const clickedPoint = elements[0];
        const datasetIndex = clickedPoint.datasetIndex;
        const index = clickedPoint.index;
        const xValue = data.labels[index];
        const yValue = data.datasets[datasetIndex].data[index];

        // Update the selectedPoint state with coordinates
        setSelectedPoint({ x: xValue, y: yValue });
      }
    },
  };

  return (
    <div>
      <h2>Clickable Graph</h2>
      <Line data={data} options={options} />
      {selectedPoint && (
        <p>Selected Point: X: {selectedPoint.x}, Y: {selectedPoint.y}</p>
      )}
    </div>
  );
}

export default Cartesiangraph;