import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const NumRegion = () => {
  const [a, setA] = useState('');
  const [plotData, setPlotData] = useState(null);

  const handlePlot = () => {
    if (a === '' || isNaN(a)) {
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

  const [showCarousel, setShowCarousel] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleCloseCarousel = () => {
    if (showCarousel) {
      setShowCarousel(false);
      setShowContent(true);
    } else {
      setShowCarousel(true);
      setShowContent(false);
    }
  };

  return (
    <>
      <div className='App'>

        <div className=' p-3 content-center ' >

          {showCarousel && (
         <div className=''>
         <div className='m-3'>
         <button onClick={handleCloseCarousel} type="button" className="btn btn-primary m-2">
       {showCarousel ? 'Hide' : 'Hint'}
     </button>
     </div>

              <Carousel
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                stopOnHover={false}
                transitionTime={500}
                className="w-96 h-96 bg-gray-300 flex justify-center items-center" // Set fixed width, height, and background color
              >
                <div className=''>
                  <div className="flex items-center">
                    <img
                      src="https://media.geeksforgeeks.org/wp-content/uploads/20210418220253/Screenshot20210418at100243PM.png"
                      alt="Image 1"
                      className=" object-cover "
                    /> </div>
                  <p
                    className=" bg-black bg-opacity-60 text-white text-center text-sm"
                    style={{ pointerEvents: 'none' }}
                  >
                    Here we saw the graph of a linear inequality in one variable.
                  </p>                         </div>

                <div className="">
                  <div className='flex justify-center items-center'>
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.GjmJdZIz6kRWmXg0SK9SpwHaEw%26pid%3DApi&f=1&ipt=0c3bde0f4555a41fd6dd897251de136a4c16aa4b46e75a10b20762c18a041954&ipo=images                    " alt="Image 2" className=" object-cover flex justify-center items-center" />
                  </div><p className=" bg-black bg-opacity-60 text-white text-center text-sm" style={{ pointerEvents: 'none' }} > We will now explore 2 dimensions     </p> </div>

                <div className="">
                  <img
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20210418220538/Screenshot20210418at100457PM.png"
                    alt="Image 2"
                    className=" object-cover flex justify-center items-center"
                  />
                  <p
                    className=" bg-black bg-opacity-60 text-white text-center text-sm"
                    style={{ pointerEvents: 'none' }}
                  >
                    A linear equation in two variables represents a line that divides the plane into two parts.We call each part a half-plane.
                    If the line is vertical, it will divide the plane into the left half-plane and the right half-plane
                  </p>
                </div>


                <div className="relative h-full flex justify-center items-center">
                  <img
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20210418220553/Screenshot20210418at100527PM.png"
                    alt="Image 2"
                    className=" object-cover flex justify-center items-center"
                  />
                  <p
                    className="absolute inset-x-0 bottom-1 p-2 bg-black bg-opacity-60 text-white text-center text-sm"
                    style={{ pointerEvents: 'none' }}
                  >
                    A non-vertical line divide the plane into the upper left half-plane and lower half-plane.           </p>
                </div>
              </Carousel>
            </div>
          )}
        </div>
        {showContent && (
          <div className="grid grid-cols-1 md:grid-cols-3 p-3 gap-3">
            <div className="bg-gray-300 p-4 rounded-md">
              <div className='p-2'>
                <div className="flex flex-row justify-between items-center">
                  <div className='font-bold text-2xl ml-2'>Instructions</div>
                  <div>
                    <button onClick={handleCloseCarousel} type="button" className="btn btn-primary m-2">
                      {showCarousel ? 'Hide' : 'Hint'}
                    </button>
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

                    <button className="btn btn-lg btn-primary mx-8 my-8" onClick={handlePlot}> Plot</button>
                    
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
        )}
      </div>
    </>
  );
};

export default NumRegion;