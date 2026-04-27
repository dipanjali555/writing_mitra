import React, { useState } from "react";
import Footer from "../common/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserLogin() {

  const navigate = useNavigate();
  const APIURL = "http://localhost:9090/user/login";

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const fetchData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  
  const validateForm = () => {

    let newErrors = {};

    const email = data.email.trim();
    const password = data.password.trim();

    const emailValid = /\S+@\S+\.\S+/.test(email);

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailValid) {
      newErrors.email = "Invalid Email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(APIURL, data);

      if (response.data === "success") {
        localStorage.setItem("userEmail", data.email);
        navigate("/userdashboard");
      } else {
        setErrors({ server: response.data });
      }

    } catch (error) {
      setErrors({ server: "Server Error ❌" });
    }
  };

  return (
    <>
      <div style={styles.page}>

        <div style={styles.card}>

          <h2 style={styles.title}>💖 Writing Mitra</h2>
          <p style={styles.subtitle}>User Login Portal</p>

          <form onSubmit={submitForm} style={styles.form}>

            {/* EMAIL */}
            <div style={styles.inputBox}>
              <span>📧</span>
              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                value={data.email}
                onChange={fetchData}
                style={styles.input}
              />
            </div>
            {errors.email && <p style={styles.error}>{errors.email}</p>}

            {/* PASSWORD */}
            <div style={styles.inputBox}>
              <span>🔒</span>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={data.password}
                onChange={fetchData}
                style={styles.input}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eye}
              >
                👁
              </span>
            </div>
            {errors.password && <p style={styles.error}>{errors.password}</p>}

            {/* SERVER ERROR */}
            {errors.server && <p style={styles.error}>{errors.server}</p>}

            <button type="submit" style={styles.button}>
              Login
            </button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default UserLogin;

/* ================= INLINE CSS ================= */

const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ffe6f0, #fff0f5)",
    padding: "20px"
  },

  card: {
    width: "360px",
    background: "white",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 15px 35px rgba(214, 51, 132, 0.25)",
    textAlign: "center"
  },

  title: {
    color: "#d63384",
    fontSize: "28px",
    fontWeight: "bold"
  },

  subtitle: {
    color: "#777",
    marginBottom: "20px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ffd1e8",
    background: "#fff5fa"
  },

  input: {
    border: "none",
    outline: "none",
    background: "transparent",
    marginLeft: "10px",
    width: "100%"
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(45deg,#ff4da6,#d63384)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  eye: {
    cursor: "pointer"
  },

  
  error: {
    color: "red",
    fontSize: "13px",
    textAlign: "left",
    marginLeft: "5px",
    marginBottom: "5px"
  }
};