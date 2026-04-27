import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AdminHeader from "./AdminHeader";

function ChangePassword() {

  const email = localStorage.getItem("adminEmail");

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
        `http://localhost:9090/admin/updatepassword/${email}`,
        passwordData
      );

      Swal.fire("Success", "Password Updated Successfully 💖", "success");

      setPasswordData({
        oldpass: "",
        newpass: "",
        confirmpass: ""
      });

    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Password update failed ❌", "error");
    }
  };

  return (
    <>
      <AdminHeader />

      {/* BACKGROUND */}
      <div
        style={{
          minHeight: "100vh",
          background: "#ffe6f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "80px"
        }}
      >

        {/* CARD */}
        <div
          style={{
            width: "420px",
            background: "#fff",
            borderRadius: "18px",
            padding: "30px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
          }}
        >

          {/* TITLE */}
          <h3
            style={{
              textAlign: "center",
              color: "#c2185b",
              marginBottom: "25px",
              fontWeight: "bold"
            }}
          >
            🔐 Change Password
          </h3>

          <form onSubmit={submitData}>

            {/* OLD PASSWORD */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontWeight: "bold" }}>Old Password</label>
              <input
                type="password"
                name="oldpass"
                value={passwordData.oldpass}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  outline: "none",
                  marginTop: "5px"
                }}
              />
            </div>

            {/* NEW PASSWORD */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontWeight: "bold" }}>New Password</label>
              <input
                type="password"
                name="newpass"
                value={passwordData.newpass}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  outline: "none",
                  marginTop: "5px"
                }}
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div style={{ marginBottom: "25px" }}>
              <label style={{ fontWeight: "bold" }}>Confirm Password</label>
              <input
                type="password"
                name="confirmpass"
                value={passwordData.confirmpass}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  outline: "none",
                  marginTop: "5px"
                }}
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "10px",
                background: "#ff69b4",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s"
              }}
            >
              🔄 Update Password
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default ChangePassword;