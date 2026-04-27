import React, { useState, useEffect } from "react";
import Footer from "../common/Footer";
import axios from "axios";
import UserHeader from "./UserHeader";

function UserFeedback() {
  const APIURL = "http://localhost:9090/user/feedback";
  const email = localStorage.getItem("userEmail");

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [validate, setValidate] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9090/user/allFeedback")
      .then((res) => setFeedbackList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0 || review.trim() === "") {
      setValidate(true);
      return;
    }

    const feedbackData = { email, rating, review };

    try {
      await axios.post(APIURL, feedbackData);

      setFeedbackList([feedbackData, ...feedbackList]);
      setRating(0);
      setReview("");

      alert("Feedback Submitted ✅");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <UserHeader />

      <div style={styles.page}>

        {/* FORM */}
        <div style={styles.formCard}>
          <h2 style={styles.title}>💖 Share Feedback</h2>

          <form onSubmit={handleSubmit}>

            <input value={email} readOnly style={styles.input} />

            <div style={styles.starBox}>
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  onClick={() => setRating(n)}
                  style={{
                    ...styles.star,
                    color: rating >= n ? "#ffb703" : "#ccc",
                    transform: rating === n ? "scale(1.2)" : "scale(1)"
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            {validate && rating === 0 && (
              <p style={{ color: "red", textAlign: "center" }}>
                Select rating
              </p>
            )}

            <textarea
              placeholder="Write your feedback..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              style={styles.textarea}
            />

            <button style={styles.button}>Submit</button>
          </form>
        </div>

        {/* FEEDBACK CARDS */}
        <div style={styles.list}>
          <h2 style={styles.heading}>⭐ Reviews</h2>

          <div style={styles.grid}>
            {feedbackList.map((f, i) => (
              <div key={i} style={styles.card}>

                <div style={styles.top}>
                  <span style={styles.email}>{f.email}</span>
                  <span style={styles.badge}>{f.rating}★</span>
                </div>

                <p style={styles.review}>{f.review}</p>

              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default UserFeedback;

/* ================= STYLES ================= */

const styles = {
  page: {
    marginTop: "75px",
    padding: "30px",
    background: "linear-gradient(135deg,#ffe6f0,#fff0f5)",
    minHeight: "100vh"
  },

  formCard: {
    maxWidth: "420px",
    margin: "auto",
    padding: "25px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },

  title: {
    textAlign: "center",
    color: "#d63384",
    marginBottom: "15px"
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginBottom: "10px"
  },

  starBox: {
    textAlign: "center",
    margin: "10px 0"
  },

  star: {
    fontSize: "30px",
    cursor: "pointer",
    transition: "0.2s"
  },

  textarea: {
    width: "100%",
    height: "90px",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd"
  },

  button: {
    width: "100%",
    marginTop: "10px",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(45deg,#ff4da6,#d63384)",
    color: "white",
    cursor: "pointer"
  },

  list: {
    marginTop: "40px"
  },

  heading: {
    textAlign: "center",
    color: "#d63384"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: "15px",
    marginTop: "20px"
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    transition: "0.3s",
    cursor: "pointer"
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px"
  },

  email: {
    fontSize: "12px",
    color: "#777"
  },

  badge: {
    background: "#d63384",
    color: "white",
    padding: "3px 8px",
    borderRadius: "10px",
    fontSize: "12px"
  },

  review: {
    fontSize: "14px",
    color: "#444"
  }
};