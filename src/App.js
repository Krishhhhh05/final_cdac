import './App.css';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Thoery1 from './components/Thoery1';
import Graph1 from './components/Graph1';
import Simulator from './components/Simulator';
import Multi from './components/Multi';
import Region from './components/Region';
import Linechart from './components/Linechart';
import NumberLine from './components/NumberLine';
import Cartesiangraph from './components/Cartesiangraph';
import Mainflow from './components/Mainflow';
import Steps from './components/Steps';
import NumRegion from './components/NumRegion';
import Animation from './components/Animation';
import Theory from './components/Theory';
import Quiz from './components/Quiz';

function App() {
  return (
    <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/simulator' element={<Thoery1 />}/>
    <Route path='/graph1' element={<Graph1 />}/>
    <Route path='/simulator' element={<Simulator />}/>
    <Route path='/multi' element={<Multi />}/>
    <Route path='/region' element={<Region />}/>
    <Route path='/linechart' element={<Linechart />}/>
    <Route path='/numberline' element={<NumberLine />}/>
    <Route path='/cartesian' element={<Cartesiangraph />}/>
    <Route path='/mainflow' element={<Mainflow />}/>
    <Route path='/steps' element={<Steps />}/>
    <Route path='/numregion' element={<NumRegion />}/>
    <Route path='/quiz' element={<Quiz />}/>
    <Route path='/theory' element={<Theory />}/>
    <Route path='/animation' element={<Animation />}/>
    </Routes>
  );
}

export default App;
