import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const Graph1 = () => {
  const [x1, setX1] = useState();
  const [y1, setY1] = useState();
  const [x2, setX2] = useState();
  const [y2, setY2] = useState();
  const [selectedPoint, setSelectedPoint] = useState(null);

  const handlePlot = () => {
    const slope = (y2 - y1) / (x2 - x1);
    const intercept = y1 - slope * x1;

    const x = [-10, 10]; // Adjust the range as needed

    // Calculate y values for the line trace
    const y = x.map((x) => slope * x + intercept);

    // Create a trace for the line
    const lineTrace = {
      x: x,
      y: y,
      mode: 'lines+markers', 
      name: 'Line',
    };

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
      clickmode: 'event+select', // Enable click events for points
    };

    return (
      <Plot
        data={[lineTrace]}
        layout={layout}
        config={{ displayModeBar: false }}
        style={{ width: '650px', height: '450px' }}
        onSelected={(data) => {
          if (data && data.points.length > 0) {
            const selectedData = data.points[0];
            setSelectedPoint({
              x: selectedData.x,
              y: selectedData.y,
            });
          }
        }}
      />
    );
  };

  return (
    <>
      <div className="App p-2">
        <div class="flex justify-start items-center h-screen">
          <div class="p-2">
            <div class="fixed-left float-right mt-8 h-3/4 border-2 px-4 py-auto border-b-4 border-gray-200 rounded-xl bg-gray-50">
              <h1 class="font-bold text-lg text-center">
                <br />Plotting the points
              </h1>
              <br />
              Here we enter the coordinates of the two lines and plot them on
              the graph.
              <br></br>
              <br></br>
              We can calculate the slope of the line with the formula:
              <br></br>
              <br />
              <img
                src="../assets/slope formula.png"
                alt="Understanding of Planes and Axis"
                style={{ width: '70%', height: '20%' }}
              ></img>
              <br />
            </div>
          </div>

          <div id="graph" class="float-left px-4 my-4">
            {handlePlot()}
          </div>

          <div class=" fixed-left float-right h-3/4 border-2 w-1/3 px-4 py-6 border-b-4 border-gray-200 rounded-xl bg-gray-50">
            <h2 class="font-semibold text-lg text-center">
              <br />
              <br />Enter the coordinates of Line 1
            </h2>

            <div className="flex-row my-3">
              X1:{' '}
              <input
                type="number"
                className="bg-white rounded-full mx-2 my-6 px-3"
                placeholder="Enter X1"
                value={x1}
                onChange={(event) => setX1(parseFloat(event.target.value))}
              />
            </div>

            <div className="flex-row">
              Y1:{' '}
              <input
                type="number"
                className="bg-white rounded-full px-3"
                placeholder="Enter Y1"
                value={y1}
                onChange={(event) => setY1(parseFloat(event.target.value))}
              />
            </div>

            <h2 class="font-semibold text-lg text-center">
              <br />Enter the coordinates of Line 2
            </h2>

            <div className="flex-row my-3">
              X2:{' '}
              <input
                type="number"
                className="bg-white rounded-full mx-2 my-6 px-3"
                placeholder="Enter X2"
                value={x2}
                onChange={(event) => setX2(parseFloat(event.target.value))}
              />
            </div>

            <div className="flex-row my-3">
              Y2:{' '}
              <input
                type="number"
                className="bg-white rounded-full mx-2 my-6 px-3"
                placeholder="Enter Y2"
                value={y2}
                onChange={(event) => setY2(parseFloat(event.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedPoint && (
        <div className="text-center mt-4">
          Selected Point: X: {selectedPoint.x}, Y: {selectedPoint.y}
        </div>
      )}
    </>
  );
};

export default Graph1;
