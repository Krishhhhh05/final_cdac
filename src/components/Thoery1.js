import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

function Theory() {

  return (
    <div className="min-h-screen p-10 justify-center">
      <h1 className="text-4xl font-bold mb-4 flex justify-center text-align-bottom-center">Graphical representation of Ax+By+C{'>'}0
    </h1>
        <Navbar />
      <div className="bg-gray-200 rounded-lg  p-4 mt-2">
        
                       <div className='text-xl'>
                        <b>Objective:  </b>
                        To plot the section represented by Ax+By+C{'>'}0 on a graph.
                        <br></br>
                        <br></br>
                        </div>
                        <div className='text-xl flex flex-row'>
                          <div className='font-bold mr-1'>

Learning Outcome:</div>
                      Students will be able to identify the section on the graph that represents the given inequality of the type Ax+By+C{'>'}0.
                        <br></br>
                        <br></br>
                        </div>

                        <div className='text-xl font-medium'>With the help of the following steps we will be learning how to plot the section represented by Ax+By+C{'>'}0 on a graph:</div>
                        <br></br>
                        <ol className='list-decimal'>                   <li>     Understanding the number line and how the numbers are represented on it.
                        </li><li>  Understanding the positive and negative section with respect to a point on the number line. 
                        </li><li>Plotting an equation of the type x-a{'>'}0 on a 2-Dimensional graph.
                        </li><li>  Understanding the correct representation of a linear equation of the type y=mx+c on the graph.
                        </li><li>  Understanding the positive and the negative sections of the graph with respect to a line and thus being able to understand how to plot Ax+By+C{'>'}0 on a graph. 
                        </li></ol>

                    </div>
        
      
       

        
    
      </div>
      );
}

      export default Theory;
