import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand">
          Luksofors 2023
        </div>
        <div>
          <ul>
            <li>
              <Link to="/komandas" className="bg-dark">Komandas</Link>
            </li>
            <li>
              <Link to="/tirdzins" className="bg-dark">Tirdziņš</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;