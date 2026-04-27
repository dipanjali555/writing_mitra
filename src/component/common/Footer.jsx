import { Link } from "react-router-dom";
import "../../css/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="row align-items-center">

          {/* LEFT - Typing Thought */}
          <div className="col-md-4">
            <p className="typing-text">
              Writing turns imagination into reality...
            </p>
          </div>

          {/* CENTER - Menu */}
          <div className="col-md-4 text-center">
            <ul className="center-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* RIGHT - Email + Logo */}
          <div className="col-md-4 text-end">
            <h4 className="logo">
              Writing<span>Mitra</span>
            </h4>
            <p className="email">📧 support@writingmitra.com</p>
          </div>

        </div>

        <hr />

        <p className="bottom">
          © 2026 Writing Mitra | MCA Final Year Project
        </p>

      </div>

    </footer>
  );
}

export default Footer;