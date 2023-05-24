import React, { useState } from "react";

function Navbar() {
  // State to track the open/closed state of the navbar
  const [open, setOpen] = useState(false);

  // Function to toggle the open/closed state of the navbar
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Luksofors 2023
        </a>
        <button className="navbar-toggler" type="button" onClick={handleToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${open && "show"}`}
          id="navbarCollapse"
        >
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/komandas"
              >
                Komandas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/tirdzins">
                Tirdziņš
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Admin
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
