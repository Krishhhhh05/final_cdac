import React, { useState } from 'react';

const Simulator = () => {
    const [isSimulated, setSimulated] = useState(false);

    const handleSimulationToggle = () => {
        setSimulated(!isSimulated);
    };
    return (
        <>
            <div>
                <h1>React Simulation</h1>
                <button onClick={handleSimulationToggle}>
                    {isSimulated ? 'Stop Simulation' : 'Start Simulation'}
                </button>
                {isSimulated && (
                    <div>
                        {/* Your simulated content goes here */}
                        <p>Simulated content is displayed here.</p>
                    </div>
                )}
            </div>
            <div class="col-12 col-md-9 border border-light border-2 overflow-auto">
                <div class="title text-center d-flex justify-content-center align-items-center fw-bolder mt-3 " >All the rectangles of the same perimeter, the square has the maximum area
                </div>
                <div class="title1 d-flex justify-content-center align-items-end fw-bolder mt-2">Objective:
                </div>
                <div class=" d-flex justify-content-center">
                    <div class="col-9 objective text-center fw-normal">To verify that amongst all the rectangles of the same perimeter, the square has the maximum area.
                    </div>
                </div>
                <div class="">
                    <div class="title1 d-flex justify-content-center align-items-end fw-bolder mt-4">Learning Outcome:
                    </div>
                    <div class="objective fw-normal d-flex justify-content-center  ">
                        <div class="col-12 col-md-9 d-flex justify-content-center">Student will be able to learn the idea of Maximum of a function. The result is also useful in preparing economical packages.</div>
                    </div></div><div class="d-flex justify-content-center mb-3 mt-3">
                    <div class="btn px-lg-5 px-sm-3" >Start</div>
                </div>
            </div>
        </>
    )
}

export default Simulator