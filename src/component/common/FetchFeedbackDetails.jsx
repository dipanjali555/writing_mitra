import React from "react";

function FetchFeedbackDetails({ feedbackArray = [] }) {

  return (
    <div style={styles.container}>

      {feedbackArray.length === 0 ? (
        <p style={styles.empty}>No Feedback Found</p>
      ) : (
        feedbackArray.map((item, index) => {

          return (
            <div key={index} style={styles.card}>

              <h3 style={styles.name}>
                👤 {item.user.name}
              </h3>

              <p style={styles.review}>
                {item.review}
              </p>

              <div style={styles.rating}>
                {"⭐".repeat(item.rating)}
              </div>

            </div>
          );
        })
      )}

    </div>
  );
}

export default FetchFeedbackDetails;

/* ---------------- STYLES ---------------- */

const styles = {

  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    padding: "25px"
  },

  card: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "18px",
    boxShadow: "0 12px 30px rgba(214, 51, 132, 0.15)",
    border: "1px solid #ffd1e8",
    transition: "0.3s",
  },

  name: {
    color: "#d63384",
    fontSize: "18px",
    marginBottom: "10px"
  },

  review: {
    fontSize: "14px",
    color: "#444",
    marginBottom: "10px",
    lineHeight: "1.5"
  },

  rating: {
    color: "#ff9800",
    fontSize: "16px",
    fontWeight: "bold"
  },

  empty: {
    textAlign: "center",
    color: "red",
    fontSize: "16px"
  }
};