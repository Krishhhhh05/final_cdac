import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { Carousel } from 'react-responsive-carousel';
// import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Swal from 'sweetalert2';

const NumRegion = () => {
  const [a, setA] = useState('');
  const [plotData, setPlotData] = useState(null);



  const handlePlot = () => {
    // Parse the value when plotting, not during input
    const numericValue = parseFloat(a);

    if (a === '' || isNaN(numericValue)) {
      Swal.fire({
        title: 'Invalid Input',
        text: 'Please enter the value of a',
        icon: 'error',
      });
      return;
    }

    if (numericValue >= -10 && numericValue <= 10) {
      // Continue with plotting logic
    } else {
      Swal.fire({
        title: 'Invalid Input',
        text: 'Please enter an integer between -10 and 10',
        icon: 'error',
      });
      return;
    }

    const x = [-10, 10];

    const lineTraceX = {
      x: [numericValue, numericValue],
      y: [-10, 10],
      mode: 'lines',
      name: 'x = a ',
    };

    const plotData = [lineTraceX];

    const fillcolorAboveX = 'rgba(0, 255,0 , 0.3)';
    const fillcolorBelowX = 'rgba(255, 0, 0, 0.3)';

    const positiveRegionX = {
      x: [numericValue, 10, 10, numericValue],
      y: [x[0], x[0], x[1], x[1]],
      fill: 'toself',
      fillcolor: fillcolorAboveX,
      mode: 'none',
      name: 'Greater Than Region (x - a > 0)',
    };

    const negativeRegionX = {
      x: [numericValue, -10, -10, numericValue],
      y: [x[0], x[0], x[1], x[1]],
      fill: 'toself',
      fillcolor: fillcolorBelowX,
      mode: 'none',
      name: 'Less Than Region (x - a < 0)',
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

  // const [showCarousel, setShowCarousel] = useState(false);
  // const [showContent, setShowContent] = useState(true);

  // const handleCloseCarousel = () => {
  //   if (showCarousel) {
  //     setShowCarousel(false);
  //     setShowContent(true);
  //   } else {
  //     setShowCarousel(true);
  //     setShowContent(false);
  //   }
  // };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 p-2 gap-3">
        <div className="bg-gray-300 p-4 rounded-md">
          <div className='p-4'>
            <div className='font-bold text-2xl flex justify-center items-center'>Instructions</div>
            <p>
              <ul class="list-disc">
                <li>Enter any value 'a ' in the input box. </li>
                <li>We plot a line using the equation x - a = 0 </li>
                <li>You will notice that the region highlighted RED represents the x - a &lt; 0 region.</li>
                <li>You will notice that the region highlighted GREEN represents the x - a &gt; 0 region.</li>
              </ul>
            </p>
            <div id="input" className=" ">
              <h1 className="font-bold text-lg text-center ">Plotting Equations</h1>
              <div className='flex justify-center items-center'>

                <label>
                  a:<input className=" bg-white rounded-full mx-2 my-6 px-3" type="number" value={a} onChange={(event) => setA(event.target.value)} />
                </label> 
              </div>
              <div className='flex justify-center items-center'>
                <button className=" btn btn-lg btn-primary " onClick={handlePlot}> Plot</button>
                </div>
            </div>
          </div>
        </div>
        <div className=" main-content bg-gray-400 p-4 col-span-2 rounded-md">
          <h4 className='flex justify-center items-center'> Plotting of Line with One Variable</h4>
          <Plot
            data={plotData}
            layout={layout}
            config={{ displayModeBar: false }}
            style={{ width: '900px', height: '500px' }}
          />
        </div>
      </div>
    </>
  );
};

export default NumRegion;


