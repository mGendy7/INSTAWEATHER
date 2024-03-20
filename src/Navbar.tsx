import React from "react";
// Props interface for Navbar component
interface props {
  temp: boolean; // Boolean indicating temperature unit (Celsius or Fahrenheit)
  toggleTemp: () => void; // Function to toggle temperature unit
}
function Navbar({ temp, toggleTemp }: props) {
  return (
    <nav className="navbar navbar-expand-lg py-4">
      <div className="container text-white">
        <h1 className="fw-bold h3">INSTAWEATHER</h1>
        {/* here we toggle to change state and accordingly we add and remove class activated that styles the spans */}
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 flex-row">
          <span
            onClick={() => toggleTemp()}
            className={`text-white fw-semibold ${temp ? "" : "activated"}`}
          >
            C
          </span>
          <span
            onClick={() => toggleTemp()}
            className={`text-white fw-semibold ${temp ? "activated" : ""}`}
          >
            F
          </span>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
