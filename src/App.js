import './App.css';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Thoery1 from './components/Thoery1';
import Graph1 from './components/Graph1';


function App() {
  return (
    <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/theory1' element={<Thoery1 />}/>
    <Route path='/graph1' element={<Graph1 />}/>

    </Routes>
  );
}

export default App;
