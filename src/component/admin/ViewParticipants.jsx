import React, { useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";

function ViewParticipants() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchParticipants = async () => {
    setLoading(true);

    try {
      const compId = 1;

      const res = await axios.get(
        `http://localhost:9090/admin/participants/${compId}`
      );

      const participantsWithName = res.data.map((p) => ({
        ...p,
        userName: p.user?.name || p.email,
      }));

      setParticipants(participantsWithName);
    } catch (error) {
      console.error("ERROR:", error);
      setParticipants([]);
    }

    setLoading(false);
  };

  return (
    <>
      <AdminHeader />

      {/* BACKGROUND */}
      <div
        style={{
          minHeight: "100vh",
          background: "#ffe6f0",
          paddingTop: "90px",
          paddingBottom: "40px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#c2185b", fontWeight: "bold" }}>
          👥 Participants List
        </h2>

        {/* BUTTON */}
        <button
          onClick={fetchParticipants}
          style={{
            padding: "12px 25px",
            margin: "20px 0",
            background: "#ff69b4",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          🔍 View Participants
        </button>

        {loading && <p>Loading... ⏳</p>}

        {/* TABLE CARD */}
        {participants.length > 0 ? (
          <div
            style={{
              width: "90%",
              margin: "auto",
              background: "#fff",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ background: "#ff69b4", color: "white" }}>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>User Name</th>
                </tr>
              </thead>

              <tbody>
                {participants.map((p, index) => (
                  <tr
                    key={index}
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid #eee",
                      transition: "0.2s",
                    }}
                  >
                    <td style={tdStyle}>{p.title}</td>
                    <td style={tdStyle}>{p.email}</td>
                    <td style={tdStyle}>{p.phone}</td>
                    <td style={{ ...tdStyle, fontWeight: "bold", color: "#c2185b" }}>
                      {p.userName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && (
            <p style={{ color: "#666", marginTop: "20px" }}>
              No participants found ❌
            </p>
          )
        )}
      </div>
    </>
  );
}

/* STYLES */
const thStyle = {
  padding: "12px",
  fontSize: "14px",
};

const tdStyle = {
  padding: "12px",
  fontSize: "14px",
  color: "#333",
};

export default ViewParticipants;