import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

    return (

        <div>
            <ul class="nav nav-tabs p-4  text-white flex justify-between">
                <Link to="/theory1" title="Theory">
                    <li class="nav-item">
                        <div class="nav-link active" aria-current="page" >Theory</div>
                    </li>
                </Link>
                <Link to="/graph1" title="Lecture">
                    <li class="nav-item">
                        <div class="nav-link active" aria-current="page" href=''>Animation</div>
                    </li>
                </Link>
                <Link to="/mainflow" title="Simulator">
                    <li class="nav-item">
                        <div class="nav-link active" aria-current="page">Simulator</div>
                    </li>
                </Link>
                <Link to="/quiz" title="Quiz">
                    <li class="nav-item">
                        <div class="nav-link active" aria-current="page" >Self Evaluation</div>
                    </li>
                </Link>
                <Link to="/setting" title="Reference">
                    <li class="nav-item">
                        <div class="nav-link active" aria-current="page" href="#">Feedback</div>
                    </li>
                </Link>
            </ul>
        </div>

    );
}

export default Navbar;