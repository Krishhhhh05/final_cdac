import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for styling

function Navbar() {
    return (
        <div>
            <ul className="nav nav-tabs p-4 text-white flex justify-between">
                <li className="nav-item">
                    <NavLink to="/theory" className="nav-link" activeClassName="active" exact>
                        Theory
                    </NavLink>
                </li>
                {/* <li className="nav-item">
                    <NavLink to="/animation" className="nav-link" activeClassName="active">
                        Animation
                    </NavLink>
                </li> */}
                <li className="nav-item">
                    <NavLink to="/simulator" className="nav-link" activeClassName="active">
                        Simulator
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/quiz" className="nav-link" activeClassName="active">
                        Self Evaluation
                    </NavLink>
                </li>
                {/* <li className="nav-item">
                    <NavLink to="/ref" className="nav-link" activeClassName="active">
                        References
                    </NavLink>
                </li> */}
                {/* <li className="nav-item">
                    <NavLink to="/feedback" className="nav-link" activeClassName="active">
                        Feedback
                    </NavLink>
                </li> */}
            </ul>
        </div>
    );
}

export default Navbar;
