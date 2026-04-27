import axios from "axios";
import React, { useEffect, useState } from "react";

function UserAllCompetition() {

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchCompetition();
  }, []);

  const fetchCompetition = async () => {
    try {
      const res = await axios.get("http://localhost:9090/user/notice");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div style={styles.page}>

        {/* HEADER */}
        <h1 style={styles.heading}>🎯 All Competitions</h1>

        {/* CARDS */}
        <div style={styles.grid}>

          {data.map((c, index) => (
            <div
              key={index}
              onClick={() => setSelected(c)}
              style={styles.card}
            >

              <h3 style={{ color: "#d63384" }}>{c.title}</h3>

              <p style={styles.text}>
                {c.description?.length > 80
                  ? c.description.substring(0, 80) + "..."
                  : c.description}
              </p>

              <button style={styles.btn}>
                View Details
              </button>

            </div>
          ))}

        </div>

        {/* DETAILS SECTION */}
        {selected && (
          <div style={styles.details}>

            <h2>🏆 {selected.title}</h2>

            <img
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94"
              alt="competition"
              style={styles.image}
            />

            <p><b>Description:</b> {selected.description}</p>
            <p><b>Opening Date:</b> {selected.openingdate || "N/A"}</p>
            <p><b>Closing Date:</b> {selected.closingdate || "N/A"}</p>

            <button
              style={styles.closeBtn}
              onClick={() => setSelected(null)}
            >
              ❌ Close
            </button>

          </div>
        )}

      </div>
    </>
  );
}

export default UserAllCompetition;

/* STYLES */
const styles = {
  page: {
    padding: "30px",
    background: "linear-gradient(135deg,#fce4ec,#f8bbd0)",
    minHeight: "100vh",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#c2185b",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "0.3s",
  },

  text: {
    fontSize: "14px",
    color: "#555",
    marginTop: "10px",
  },

  btn: {
    marginTop: "15px",
    padding: "8px 12px",
    border: "none",
    background: "#d63384",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  },

  details: {
    marginTop: "40px",
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  },

  image: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "15px",
  },

  closeBtn: {
    marginTop: "15px",
    padding: "8px 12px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};