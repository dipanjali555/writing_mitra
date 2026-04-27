import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

function UserHelp() {
  return (
    <>
      <Header />

      <div style={styles.page}>
        <h1 style={styles.title}>User Help</h1>
        <p style={styles.sub}>Follow these steps to use Writing Mitra easily</p>

        <div style={styles.box}>

          <h3>1. Register</h3>
          <p>Create your account using name, email, and password.</p>

          <h3>2. Login</h3>
          <p>Login using your registered email and password.</p>

          <h3>3. Dashboard</h3>
          <p>After login, you will see your dashboard.</p>

          <h3>4. Create Writing</h3>
          <p>You can write poems, blogs, and stories.</p>

          <h3>5. Participation</h3>
          <p>Join competitions and submit your writing.</p>

          <h3>6. Feedback</h3>
          <p>You can give feedback about the platform.</p>

          <h3>7. Edit Profile</h3>
          <p>Update your personal details anytime.</p>

          <h3>8. Logout</h3>
          <p>Logout safely after completing your work.</p>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserHelp;

/* ===== STYLES ===== */

const styles = {
  page: {
    marginTop: "80px",
    padding: "30px",
    minHeight: "100vh",
    background: "#fff0f5"
  },

  title: {
    textAlign: "center",
    color: "#d63384",
    fontSize: "30px",
    fontWeight: "bold"
  },

  sub: {
    textAlign: "center",
    color: "#555",
    marginBottom: "20px"
  },

  box: {
    maxWidth: "700px",
    margin: "auto",
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    lineHeight: "1.6"
  }
};