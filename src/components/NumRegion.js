import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Carousel from 'react-bootstrap/Carousel';

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

    // Color regions above and below the lines based on 'a'

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
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };


  return (
    <>
      <div className='App'>
        <button onClick={handleCloseCarousel} type="button" class="btn btn-primary m-2 ">
          {showCarousel ? 'Hide Carousel' : 'Show Carousel'}
        </button>
        {showCarousel && (
          <Carousel activeIndex={index} onSelect={handleSelect} interval={5000}>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.rvSWtRd_oPRTwDoTCmkP5gHaE8%26pid%3DApi&f=1&ipt=b720442f6ab6e413907bad8cfb489afed5095d4e724bf072470136e85d430f06&ipo=images"
                alt="3D Plane"
              />
              <Carousel.Caption>
                <h3 className="text-success fw-bolder fs-3">3D Plane</h3>
                <p className="text-muted fs-6 fw-bold">
                  A plane in 3D coordinate space is a flat surface that extends indefinitely containing a vector that is perpendicular to the plane called as the normal.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ZO4TmUbxM5-V1R7bbDpMHQHaEK%26pid%3DApi&f=1&ipt=1b90e9c843316a081f822f4cb672b1d44b4f201f4a9cfaca6a96927ddea4394c&ipo=images"
                alt="Angle Between Planes"
              />
              <Carousel.Caption>
                <h3 className="text-success fw-bolder fs-3">Angle Between Planes</h3>
                <p className="text-muted fs-6 fw-bold">
                  The angle between two planes is equal to the angle between their normals.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.bPBCgvp9N0SUbVYJnBg2IQHaEo%26pid%3DApi&f=1&ipt=1ed7532ff69f93a73e18f28cbbcaa6770be3ea6ce8c9713811f5161fbe387718&ipo=images"
                alt="Pup"
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

        )}
        {showContent && (
          <div class='main flex flex-row'>
            <div className='graph'>
            <Plot
              data={plotData}
              layout={layout}
              config={{ displayModeBar: false }}
              style={{ width: '700px', height: '500px' }}
            />
            </div>

            <div id="input" className="ml-6 mr-6 top-4 fixed-left float-right border-2 w-1/3 p-4 border-b-4 border-gray-200 rounded-xl bg-gray-50">
              <h1 className="font-bold text-lg text-center">Plotting Equations</h1>
              <label>a:<input className="bg-white rounded-full mx-2 my-6 px-3" type="number" value={a} placeholder="Enter a to plot X - a > 0 " onChange={(event) => setA(parseFloat(event.target.value))} /> </label>
              <button className="btn btn-lg btn-primary mx-8 my-8" onClick={handlePlot}> Plot</button>

            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NumRegion;
