import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminEmail");
    navigate("/admin");
  };

  return (
    <>
      <header className="header">

        <h2>🌸 Admin Panel</h2>

        {/* NAV LINKS */}
        <nav className="nav">

          <Link to="/admindashboard">Dashboard</Link>
          <Link to="/allcontacts">Contacts</Link>
          <Link to="/allfeedback">Feedback</Link>
          <Link to="/allcompetition">Competition</Link>

        </nav>

        {/* LOGOUT */}
        <button onClick={logout}>Logout</button>

      </header>

      <style>{`
        .header{
          height:60px;
          background:linear-gradient(90deg,#ffb6c1,#ffc0cb);
          color:white;
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:0 20px;
          position:fixed;
          top:0;
          width:100%;
          z-index:1000;
          box-shadow:0 4px 10px rgba(0,0,0,0.1);
        }

        .header h2{
          margin:0;
          font-size:18px;
        }

        .nav{
          display:flex;
          gap:15px;
        }

        .nav a{
          text-decoration:none;
          color:#fff;
          font-weight:bold;
          padding:5px 10px;
          border-radius:6px;
          transition:0.3s;
        }

        .nav a:hover{
          background:white;
          color:#d63384;
        }

        button{
          background:white;
          color:#d63384;
          border:none;
          padding:7px 15px;
          border-radius:8px;
          cursor:pointer;
          font-weight:bold;
        }

        button:hover{
          background:#d63384;
          color:white;
        }
      `}</style>
    </>
  );
}

export default AdminHeader;