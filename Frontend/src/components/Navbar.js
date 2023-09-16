import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <div className="navbar-brand">
          Luksofors 2023
        </div>
        <div>
          <ul>
            <li>
              <Link to="/komandas">Komandas</Link>
            </li>
            <li>
              <Link to="/tirdzins">Tirdziņš</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
