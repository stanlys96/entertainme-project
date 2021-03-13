import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light mb-3" style={{ background: 'rgba(248, 249, 250, 0.8)' }}>
      <div className="container">
        <ul className="navbar-nav">
          <NavLink className="navbar-brand" to="/">Stanflix</NavLink>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/favorites">Favorites</NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/addmovie">Add Movie</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;