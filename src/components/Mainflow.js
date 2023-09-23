import React, { useState } from 'react';
import Navbar from './Navbar';
import Linechart from './Linechart';
import NumberLine from './NumberLine';
import NumRegion from './NumRegion';

const ComponentA = () => {
  return (
    <div>
      <h4>Line Chart</h4>
      <Linechart />
    </div>
  );
};

const ComponentB = () => {
  return (
    <div>
      <h4>Component 2</h4>
      <NumberLine />
    </div>
  );
};

const ComponentC = () => {
  return (
    <div>
      <h4>Component 3</h4>

      <NumRegion/>
    </div>
  );
};

const Mainflow = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className='p-3 content-center'>
    <Navbar />
  <div className="bg-gray-200 rounded-lg flex flex-col h-2/3  items-center justify-center">
    <div>
    {step === 1 && <ComponentA />}
    {step === 2 && <ComponentB />}
    {step === 3 && <ComponentC />}
    </div>
    <div>   <button  type="button" class="btn btn-primary m-2 " onClick={nextStep}>Next</button>
    </div>
 
  </div>
  </div>
  );
};

export default Mainflow;

