import React, { useEffect, useState } from "react";
import axios from "axios";
import UserHeader from "./UserHeader";

function ViewCompetition() {
  const [competitions, setCompetitions] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);

  useEffect(() => {
    
    axios.get("http://localhost:9090/admin/allNotices")
      .then(res => setCompetitions(res.data))
      .catch(err => console.error("Error fetching competitions:", err));
  }, []);

  const fetchParticipants = (compId) => {
    
    axios.get(`http://localhost:9090/admin/participants/${compId}`)
      .then(res => {
        setParticipants(res.data);
        setShowParticipants(true);
      })
      .catch(err => console.error("Error fetching participants:", err));
  };

  return (
    <>
      <UserHeader />

      <h1 style={{ textAlign: "center", margin: "50px", fontWeight: "bold", color: "#2c3e50" }}>
        All Competitions
      </h1>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "20px" }}>
        {competitions.map(item => (
          <div key={item.id} style={{
            width: "320px",
            borderRadius: "15px",
            backgroundColor: "#fff",
            boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
            overflow: "hidden",
            transition: "0.3s",
            cursor: "pointer"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            
            <div style={{ backgroundColor: "#007bff", color: "#fff", padding: "10px", textAlign: "center", fontWeight: "bold" }}>
              Competition
            </div>

            <div style={{ padding: "15px" }}>
              <h3 style={{ marginBottom: "10px", color: "#333" }}>{item.title}</h3>
              <p style={{ fontSize: "14px", color: "#555" }}>{item.description}</p>
              <p><b>📅 Opening:</b> {item.openingdate}</p>
              <p><b>⏳ Closing:</b> {item.closingdate}</p>
              <p style={{ fontSize: "13px", color: "#777" }}><b>Rules:</b> {item.rules}</p>

              <button onClick={() => fetchParticipants(item.id)} style={{
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}>
                View Participants
              </button>
            </div>
          </div>
        ))}
      </div>

      {showParticipants && participants.length > 0 && (
        <div style={{ margin: "30px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
          <h2>Participants</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Title</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {participants.map(p => (
                <tr key={p.pId} style={{ textAlign: "center", borderBottom: "1px solid #ccc" }}>
                  <td>{p.user ? p.user.name : "N/A"}</td>
                  <td>{p.email || "N/A"}</td>
                  <td>{p.phone || "N/A"}</td>
                  <td>{p.title || "N/A"}</td>
                  <td>{p.winner || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showParticipants && participants.length === 0 && (
        <div style={{ textAlign: "center", margin: "20px", color: "#555" }}>
          No participants found for this competition.
        </div>
      )}
    </>
  );
}

export default ViewCompetition;