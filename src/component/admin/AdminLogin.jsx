import "../../css/adminlogin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Footer from "../common/Footer";

function AdminLogin() {

  const navigate = useNavigate();
  const APIURL = "http://localhost:9090/admin/login";

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
        localStorage.setItem("adminEmail", data.email);
        navigate("/admindashboard");
      } else {
        setErrors({ server: response.data });
      }

    } catch (error) {
      setErrors({ server: "Server not reachable ❌" });
    }
  };

  return (
    <>
      <div className="admin-container">
        <div className="admin-login-card">

          <h2 className="brand-title">Writing Mitra Admin</h2>
          <p className="sub-text">Secure Access to Dashboard</p>

          <form onSubmit={submitForm} noValidate>

            {/* EMAIL */}
            <div className="input-group-custom">
              <span className="input-icon">📧</span>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={data.email}
                onChange={fetchData}
              />
            </div>
            {errors.email && <p className="error-text">{errors.email}</p>}

            {/* PASSWORD */}
            <div className="input-group-custom">
              <span className="input-icon">🔒</span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                value={data.password}
                onChange={fetchData}
              />

              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </span>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}

            {/* SERVER ERROR */}
            {errors.server && <p className="error-text">{errors.server}</p>}

            <button type="submit" className="login-button">
              Login
            </button>

          </form>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminLogin;