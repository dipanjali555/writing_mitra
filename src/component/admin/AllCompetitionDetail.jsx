import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllCompetitionDetail({ competitionArray }) {

  const [participants, setParticipants] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();

  const fetchParticipants = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:9090/admin/participants/${id}`
      );

      setParticipants(res.data);
      setActiveId(id);
    } catch (err) {
      console.log(err);
    }
  };

  const styles = {

    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "30px",
      padding: "10px"
    },

    card: {
      width: "340px",
      background: "#ffffff",
      borderRadius: "22px",
      padding: "20px",
      boxShadow: "0 15px 35px rgba(214, 51, 132, 0.25)",
      border: "1px solid #ffd1e8",
      backgroundImage: "linear-gradient(145deg, #ffffff, #fff5fa)"
    },

    title: {
      color: "#d63384",
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "10px"
    },

    text: {
      fontSize: "14px",
      color: "#444",
      margin: "6px 0"
    },

    row: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px",
      fontSize: "13px",
      color: "#666",
      padding: "5px 0"
    },

    button: {
      width: "100%",
      padding: "11px",
      marginTop: "12px",
      background: "linear-gradient(45deg, #ff4da6, #d63384)",
      color: "white",
      border: "none",
      borderRadius: "14px",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 6px 15px rgba(214, 51, 132, 0.3)"
    },

    partBox: {
      marginTop: "12px",
      padding: "12px",
      background: "#fff0f6",
      borderRadius: "12px",
      border: "1px solid #ffd1e8"
    },

    participant: {
      color: "#0d6efd",
      cursor: "pointer",
      padding: "4px 0"
    }
  };

  return (
    <div style={styles.container}>

      {competitionArray?.length === 0 ? (
        <p>No Competitions Found</p>
      ) : (
        competitionArray.map((comp, index) => {

          const compId = comp.compId || comp.id;
          const isOpen = new Date(comp.closingdate) > new Date();

          return (
            <div key={index} style={styles.card}>

              <h3 style={styles.title}>🏆 {comp.title}</h3>

              <p style={styles.text}>
                <b>Description:</b> {comp.description}
              </p>

              <p style={styles.text}>
                <b>Rules:</b> {comp.rules}
              </p>

              <div style={styles.row}>
                <span>🟢 {comp.openingdate}</span>
                <span>🔴 {comp.closingdate}</span>
              </div>

              {isOpen ? (
                <button
                  style={styles.button}
                  onClick={() => fetchParticipants(compId)}
                >
                  Participate Now
                </button>
              ) : (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  Closed
                </p>
              )}

              {activeId === compId && (
                <div style={styles.partBox}>
                  <h4>👥 Participants</h4>

                  {participants.length === 0 ? (
                    <p>No Participants</p>
                  ) : (
                    participants.map((p, i) => (
                      <p
                        key={i}
                        style={styles.participant}
                        onClick={() =>
                          navigate("/viewallparticipants", {
                            state: { data: p }
                          })
                        }
                      >
                        👉 {p.user?.name || "No Name"}
                      </p>
                    ))
                  )}
                </div>
              )}

            </div>
          );
        })
      )}

    </div>
  );
}

export default AllCompetitionDetail;