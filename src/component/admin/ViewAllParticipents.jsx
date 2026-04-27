import React from "react";
import { useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import axios from "axios";

function ViewAllParticipents() {

  const location = useLocation();
  const pobj = location.state?.data;

  if (!pobj) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        No Data Found ❌
      </h2>
    );
  }

  const markAsWinner = async () => {
    try {
      await axios.post(`http://localhost:9090/admin/markWinner/${pobj.pId}`);
      alert("🏆 Winner Selected!");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Error while marking winner");
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
            width: "380px",
            background: "#fff",
            borderRadius: "18px",
            padding: "25px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
          }}
        >

          <h3
            style={{
              textAlign: "center",
              color: "#c2185b",
              marginBottom: "20px",
              fontWeight: "bold"
            }}
          >
            👤 Participant Details
          </h3>

          {/* DETAILS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

            <p style={textStyle}><b>Name:</b> {pobj.user?.name || "No Name"}</p>
            <p style={textStyle}><b>Email:</b> {pobj.email}</p>
            <p style={textStyle}><b>Phone:</b> {pobj.phone}</p>
            <p style={textStyle}><b>Title:</b> {pobj.title}</p>
            <p style={textStyle}><b>Content:</b> {pobj.content}</p>

            {/* WINNER STATUS */}
            <p
              style={{
                ...textStyle,
                fontWeight: "bold",
                color: pobj.winner ? "green" : "#ff4d4d"
              }}
            >
              🏆 Winner: {pobj.winner ? "Yes" : "Not Decided"}
            </p>

            {/* BUTTON */}
            {!pobj.winner && (
              <button
                onClick={markAsWinner}
                style={{
                  marginTop: "10px",
                  padding: "12px",
                  background: "#ff69b4",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "0.3s"
                }}
              >
                🏆 Mark as Winner
              </button>
            )}

          </div>

        </div>

      </div>
    </>
  );
}

/* TEXT STYLE */
const textStyle = {
  fontSize: "15px",
  color: "#333",
  margin: 0
};

export default ViewAllParticipents;