import "./Navbar.css";
import dumbbell from "../../assets/dumbbell.png";
import menuIcon from "../../assets/menu.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);

  const handleNavbarExpand = () => {
    setNavbarIsOpen(!navbarIsOpen);
  };

  return (
    <>
      <nav className="navbar">
        <img src={dumbbell} className="logo" />
        <p>Workout Tracker</p>
        <img
          src={menuIcon}
          className="nav-button"
          onClick={handleNavbarExpand}
        />
      </nav>

      <div
        className={`expanded-navbar-container ${navbarIsOpen ? "open" : ""}`}
      >
        <nav className="expanded-navbar">
          <ul>
            <Link to="/dashboard" className="link">
              <li onClick={handleNavbarExpand}>Dashboard</li>
            </Link>
            <Link to="/history" className="link">
              <li onClick={handleNavbarExpand}>History</li>
            </Link>
            <Link to="/start" className="link">
              <li onClick={handleNavbarExpand}>Start</li>
            </Link>
            <Link to="/exercises" className="link">
              <li onClick={handleNavbarExpand}>Exercises</li>
            </Link>
          </ul>
        </nav>
      </div>
    </>
  );
}
