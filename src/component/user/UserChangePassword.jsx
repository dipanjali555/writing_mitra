import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UserHeader from "./UserHeader";

function UserChangePassword() {

  const email = localStorage.getItem("userEmail");

  const [passwordData, setPasswordData] = useState({
    oldpass: "",
    newpass: "",
    confirmpass: ""
  });

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (passwordData.newpass !== passwordData.confirmpass) {
      Swal.fire("Error", "New Password and Confirm Password must match", "error");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:9090/user/updatepassword/${email}`,
        passwordData
      );

      Swal.fire("Success", response.data, "success");

      setPasswordData({
        oldpass: "",
        newpass: "",
        confirmpass: ""
      });

    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Password update failed", "error");
    }
  };

  return (
    <>
      <UserHeader />

      <div style={styles.page}>

        <div style={styles.card}>

          <h2 style={styles.title}>🔐 Change Password</h2>
          <p style={styles.subtitle}>Secure your account ✨</p>

          <form onSubmit={submitData}>

            <input
              type="password"
              name="oldpass"
              placeholder="Old Password"
              value={passwordData.oldpass}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              type="password"
              name="newpass"
              placeholder="New Password"
              value={passwordData.newpass}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              type="password"
              name="confirmpass"
              placeholder="Confirm Password"
              value={passwordData.confirmpass}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <button type="submit" style={styles.button}>
              Update Password
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default UserChangePassword;

/* ---------------- STYLES ---------------- */

const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "80px",
    background: "linear-gradient(135deg, #ffe6f0, #fff0f5)"
  },

  card: {
    width: "400px",
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 20px 50px rgba(214, 51, 132, 0.25)",
    border: "1px solid #ffd1e8"
  },

  title: {
    textAlign: "center",
    color: "#d63384",
    marginBottom: "5px"
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
    transition: "0.3s"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(45deg, #ff4da6, #d63384)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px"
  }
};