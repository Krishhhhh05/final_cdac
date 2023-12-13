import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Swal from 'sweetalert2';

const NumRegion = () => {
  const [a, setA] = useState('');
  const [plotData, setPlotData] = useState(null);



  const handlePlot = () => {

    if (a === '' || isNaN(a)) {
      Swal.fire({
        title: 'Invalid Input',
        text: 'Please enter the value of a',
        icon: 'error',
      });
    }

    if (a >= -10 && a <= 10) {
    } else {
      Swal.fire({
        title: 'Invalid Input',
        text: 'Please enter an integer between -10 and 10',
        icon: 'error',
      });
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
      name: 'Greater Than Region (x - a > 0)',
    };

    const negativeRegionX = {
      x: [a, -10, -10, a],
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
      <div className="grid grid-cols-1 md:grid-cols-3 p-3 gap-3">
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
              <h1 className="font-bold text-lg text-center">Plotting Equations</h1>
              <label>a:<input className="bg-white rounded-full mx-2 my-6 px-3" type="number" value={a} onChange={(event) => setA(parseFloat(event.target.value))} /> </label>
              <p><button className="btn btn-lg btn-primary mx-8 my-8" onClick={handlePlot}> Plot</button>
              </p>
            </div>
          </div>
        </div>
        <div className=" main-content bg-gray-400 p-4 col-span-2 rounded-md">
          <h4 className='flex justify-center items-center'> Plotting of Line with One Variable</h4>
          <Plot
            data={plotData}
            layout={layout}
            config={{ displayModeBar: false }}
            style={{ width: '700px', height: '500px' }}
          />
        </div>
      </div>
    </>
  );
};

export default NumRegion;



{/* <Carousel
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
              </Carousel> */}