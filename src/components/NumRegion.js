import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const NumRegion = () => {
  const [a, setA] = useState('');
  const [plotData, setPlotData] = useState(null);

  const handlePlot = () => {
    if (a === '' || isNaN(a)) {
      // Handle missing or invalid input
      return;
    }

    const x = [-10, 10];
    const lineTraceX = {
      x: [a, a],
      y: [-10, 10],
      mode: 'lines',
      name: 'x = a ',
    };

    const plotData = [lineTraceX];


    const fillcolorAboveX = 'rgba(0, 255,0 , 0.3)';
    const fillcolorBelowX = 'rgba(255, 0, 0, 0.3)';





    const positiveRegionX = {
      x: [a, 10, 10, a],
      y: [x[0], x[0], x[1], x[1]],
      fill: 'toself',
      fillcolor: fillcolorAboveX,
      mode: 'none',
      name: 'Positive Region (x - a > 0)',
    };

    const negativeRegionX = {
      x: [a, -10, -10, a],
      y: [x[0], x[0], x[1], x[1]],
      fill: 'toself',
      fillcolor: fillcolorBelowX,
      mode: 'none',
      name: 'Negative Region (x - a < 0)',
    };

    plotData.push(positiveRegionX, negativeRegionX);
    setPlotData(plotData);
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
    showlegend: true,
  };






  return (
    <>
      <div className='App'>
        <div className="grid grid-cols-1 md:grid-cols-3 p-3 gap-3">
          <div className="bg-gray-300 p-4 rounded-md">
            {/* Content for the left grid */}
            <div className='p-2'>
              <div className="flex flex-row justify-between items-center">
                <div className='font-bold text-2xl ml-2'>Instructions</div>
                <div>

                </div>
              </div>
              <p>
                <ul class="list-disc">
                  <li> Previously we visualized the values in 1 dimension <p>( X- Axis)</p></li>
                  <li> Now we will visualize the same in 2 dimensions <p>( X & Y Axis) </p></li>
                  <li> We will use the equation X- a = 0 </li>
                  <li> Enter 'a' as the input </li>
                </ul>
                <div id="input" className=" ">
                  <h1 className="font-bold text-lg text-center">Plotting Equations</h1>
                  <label>a:<input className="bg-white rounded-full mx-2 my-6 px-3" type="number" value={a} placeholder="Enter a to plot X - a > 0 " onChange={(event) => setA(parseFloat(event.target.value))} /> </label>
                  <p><button className="btn btn-lg btn-primary mx-8 my-8" onClick={handlePlot}> Plot</button>
                  </p>
                </div>
              </p>
            </div>
          </div>

          <div className=" main-content bg-gray-400 p-4 col-span-2 rounded-md">
            <Plot
              data={plotData}
              layout={layout}
              config={{ displayModeBar: false }}
              style={{ width: '700px', height: '500px' }}
            />
          </div>


        </div>

      </div>
    </>
  );
};

export default NumRegion;
