import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

    return (

        <div>
            <ul class="nav nav-tabs p-4  text-white flex justify-between">
                <Link to="/theory1" title="Theory">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Theory</a>
                    </li>
                </Link>
                <Link to="/graph1" title="Lecture">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Animation</a>
                    </li>
                </Link>
                <Link to="/mainflow" title="Simulator">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Simulator</a>
                    </li>
                </Link>
                <Link to="/quiz" title="Quiz">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Self Evaluation</a>
                    </li>
                </Link>
                <Link to="/setting" title="Reference">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Feedback</a>
                    </li>
                </Link>
            </ul>
        </div>

    );
}

export default Navbar;