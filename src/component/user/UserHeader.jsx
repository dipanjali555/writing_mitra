import { useState } from "react";
import { Link } from "react-router-dom";

function UserHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* TOP NAVBAR */}
      <nav style={styles.navbar}>
        <span style={styles.logo}>💖 User Dashboard</span>

        <button style={styles.menuBtn} onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </nav>

      {/* SIDEBAR */}
      <div style={{ ...styles.sidebar, right: isOpen ? "0" : "-260px" }}>

        {/* USER INFO */}
        <div style={styles.userBox}>
          <div style={styles.avatar}>👤</div>
          <p style={styles.userText}>Hello User</p>
        </div>

        {/* MENU */}
        <div style={styles.menu}>

          <Link to="/user/home" style={styles.link} onClick={() => setIsOpen(false)}>🏠 Home</Link>
          
          <Link to="/blog" style={styles.link} onClick={() => setIsOpen(false)}>📝 Blog</Link>
          <Link to="/user/feedback" style={styles.link} onClick={() => setIsOpen(false)}>💬 Feedback</Link>
          <Link to="/user/allCompetition" style={styles.link} onClick={() => setIsOpen(false)}>🏆 Competition</Link>
          <Link to="/participate" style={styles.link} onClick={() => setIsOpen(false)}>🎯 Participate</Link>
          <Link to="/user/allfeedback" style={styles.link} onClick={() => setIsOpen(false)}>📋 All Feedback</Link>
          <Link to="/user/edit-profile" style={styles.link} onClick={() => setIsOpen(false)}>✏ Edit Profile</Link>
          <Link to="/user/changepassword" style={styles.link} onClick={() => setIsOpen(false)}>🔑 Change Password</Link>
          
          <Link to="/searchBlog" style={styles.link} onClick={() => setIsOpen(false)}>🔍 Search Blog</Link>
          <Link to="/CreativeWriterPage" style={styles.link} onClick={() => setIsOpen(false)}>🔑 Creative page</Link>

          <Link to="/logout" style={styles.logout} onClick={() => setIsOpen(false)}>
            🚪 Logout
          </Link>

        </div>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div style={styles.overlay} onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}

export default UserHeader;

/* ---------------- STYLES ---------------- */

const styles = {

  navbar: {
    height: "60px",
    background: "linear-gradient(45deg, #ff4da6, #d63384)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
    color: "white",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
  },

  logo: {
    fontSize: "18px",
    fontWeight: "bold"
  },

  menuBtn: {
    background: "transparent",
    border: "none",
    fontSize: "26px",
    color: "white",
    cursor: "pointer"
  },

  sidebar: {
    position: "fixed",
    top: 0,
    width: "260px",
    height: "100vh",
    background: "linear-gradient(180deg, #d63384, #ff4da6)",
    transition: "0.3s",
    paddingTop: "70px",
    zIndex: 1001,
    boxShadow: "-5px 0 20px rgba(0,0,0,0.3)",

    overflowY: "auto"   
  },

  userBox: {
    textAlign: "center",
    marginBottom: "20px",
    color: "white"
  },

  avatar: {
    fontSize: "50px"
  },

  userText: {
    marginTop: "5px",
    fontWeight: "bold"
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    padding: "0 15px",
    gap: "8px",
    paddingBottom: "50px" // ✅ extra space for scroll
  },

  link: {
    textDecoration: "none",
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.15)"
  },

  logout: {
    textDecoration: "none",
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    background: "#ff2e63",
    marginTop: "10px"
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)",
    zIndex: 1000
  }
};