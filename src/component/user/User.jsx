import React from "react";

import UserHeader from "./UserHeader";
import Footer from "../common/Footer";
import "../../css/adminlogin.css";


function User() {
  return (
    <>
      
      <UserHeader/>

      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to right, #667eea, #764ba2)",
          padding: "20px",
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: "850px",
            background: "#fff",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            overflow: "hidden",
          }}
        >
          <div className="row g-0">

            
            <div
              className="col-md-6 d-flex justify-content-center align-items-center"
              style={{ background: "#f8f9fa", padding: "30px" }}
            >
              <img
                src="login.png"
                alt="login"
                style={{ width: "100%", maxWidth: "250px" }}
              />
            </div>

            {/* Right Form Section */}
            <div className="col-md-6 p-5">
              <h3 className="text-center mb-4" style={{ fontWeight: "bold" }}>
                User Login
              </h3>

              <form>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary btn-lg">
                    Login
                  </button>
                </div>

                <p className="text-center mt-3 text-muted">
                  Don't have an account? Register
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default User;
