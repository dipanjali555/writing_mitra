import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../common/Header";
import Footer from "../common/Footer";

function OurWinners() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    try {
      const res = await axios.get("http://localhost:9090/user/winners");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* HEADER */}
      <Header />

      {/* PAGE CONTENT */}
      <div style={styles.page}>

        <h2 style={styles.heading}>🏆 Hall of Fame Winners</h2>
        <p style={styles.subHeading}>Celebrating our champions ✨</p>

        {data.length === 0 ? (
          <p style={styles.empty}>No Winners Found</p>
        ) : (
          <div style={styles.container}>
            {data.map((p, index) => (
              <div key={index} style={styles.card}>

                <div style={styles.badge}>🥇 WINNER</div>

                <h3 style={styles.title}>
                  🏆 {p.user?.name || "No Name"}
                </h3>

                <div style={styles.infoBox}>
                  <p style={styles.text}><b>Email:</b> {p.email}</p>
                  <p style={styles.text}><b>Phone:</b> {p.phone}</p>
                  <p style={styles.text}><b>Title:</b> {p.title}</p>
                  <p style={styles.text}><b>Content:</b> {p.content}</p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default OurWinners;

/* ---------------- STYLES ---------------- */

const styles = {

  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg, #fff0f5, #ffe6f0)"
  },

  heading: {
    textAlign: "center",
    fontSize: "32px",
    color: "#d63384",
    fontWeight: "bold"
  },

  subHeading: {
    textAlign: "center",
    color: "#666",
    marginBottom: "25px"
  },

  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px"
  },

  card: {
    width: "330px",
    background: "white",
    borderRadius: "22px",
    padding: "20px",
    boxShadow: "0 15px 35px rgba(214, 51, 132, 0.25)",
    border: "1px solid #ffd1e8",
    position: "relative"
  },

  badge: {
    position: "absolute",
    top: "-10px",
    right: "10px",
    background: "linear-gradient(45deg, #ff4da6, #d63384)",
    color: "white",
    padding: "5px 10px",
    fontSize: "12px",
    borderRadius: "12px",
    fontWeight: "bold"
  },

  title: {
    color: "#d63384",
    marginBottom: "12px",
    fontSize: "20px"
  },

  infoBox: {
    background: "#fff5fa",
    padding: "10px",
    borderRadius: "12px"
  },

  text: {
    fontSize: "14px",
    color: "#444",
    margin: "5px 0"
  },

  empty: {
    textAlign: "center",
    color: "red"
  }
};