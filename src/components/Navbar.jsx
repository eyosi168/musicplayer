import { Link, useLocation } from "react-router";
function Navbar() {
    const location = useLocation()
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link className="brand-link" to="/">
          Music Player
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${location.pathname=== '/playlists' ? "active":""}`}>
          All songs
        </Link>
        <Link to="/playlists" className={`nav-link ${location.pathname=== '/' ? "active":""}`}>
          playlists
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
