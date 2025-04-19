import "../styles/Navbar.css";
import dumbbell from "../assets/dumbbell.png";
import menuIcon from "../assets/menu.png";
import { useState } from "react";

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
            <li>Dashboard</li>
            <li>History</li>
            <li>Start</li>
            <li>Exercises</li>
          </ul>
        </nav>
      </div>
    </>
  );
}
