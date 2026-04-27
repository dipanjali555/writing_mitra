import React, { useState } from "react";
import { Link } from "react-router-dom";

function BlogHeader() {
  const [collapsed, setCollapsed] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  return (
    <>
      
      <nav className="navbar navbar-dark bg-primary fixed-top px-3" style={{height:"60px"}}>
        <button className="btn btn-outline-light d-lg-none" onClick={() => setShowMobile(!showMobile)}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <button className="btn btn-outline-light d-none d-lg-block" onClick={() => setCollapsed(!collapsed)}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <span className="navbar-brand ms-2">Writing Mitra</span>
      </nav>

      
      <div className={`bg-primary text-white position-fixed start-0 ${showMobile ? "d-block" : "d-none d-lg-block"}`} 
           style={{top:"60px", width:collapsed?"80px":"240px", height:"calc(100vh - 60px)", transition:"0.3s"}}>
        <ul className="nav flex-column pt-3">
          <li className="nav-item">
            <Link className="nav-link text-white menu-item" to="/dashboard">
              <i className="fa-solid fa-gauge me-2"></i>
              {!collapsed && "Dashboard"}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white menu-item" to="/blog">
              <i className="fa-solid fa-pen me-2"></i>
              {!collapsed && "Create Blog"}
            </Link>
          </li>
        </ul>
      </div>

      
      <style>
        {`
          .menu-item { padding:12px 20px; transition:0.2s; }
          .menu-item:hover { background-color:#0d6efd; color:white !important; }
        `}
      </style>
    </>
  );
}

export default BlogHeader;