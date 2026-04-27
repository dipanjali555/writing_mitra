import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:9090/admin/login",  
        admin
      );

      if (res.data === "success") {
        alert("Login Success ✅");

        localStorage.setItem("adminEmail", admin.email);

        navigate("/admindashboard");
      } else {
        alert(res.data);
      }

    } catch (err) {
      console.log(err);
      alert("Server Error ❌");
    }
  };

  return (
    <div style={styles.container}>

      <form onSubmit={submitForm} style={styles.card}>

        <h2>🌸 Admin Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={admin.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={admin.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.btn}>
          Login
        </button>

      </form>

    </div>
  );
}

export default AdminLogin;

/* UI */
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffe6f0",
  },

  card: {
    width: "300px",
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    textAlign: "center",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  btn: {
    width: "100%",
    padding: "10px",
    background: "#d63384",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};