import React from "react";

function FeedbackDetail({ feedbackArray, deleteById }) {
  return (
    <div style={styles.page}>

      <h2 style={styles.title}> User Feedbacks</h2>
      <p style={styles.subtitle}>What users are saying ✨</p>

      <div style={styles.card}>

        <table style={styles.table}>

          <thead>
            <tr style={styles.headRow}>
              <th>#</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {feedbackArray.map((fobj, index) => (
              <tr key={index} style={styles.row}>

                <td>{index + 1}</td>
                <td>{fobj.email}</td>

                <td>
                  <span style={styles.rating}>
                    ⭐ {fobj.rating}
                  </span>
                </td>

                <td style={styles.review}>
                  {fobj.review}
                </td>

                <td>
                  <button
                    style={styles.button}
                    onClick={() => deleteById(fobj.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default FeedbackDetail;

/* ---------------- STYLES ---------------- */

const styles = {

  page: {
    minHeight: "100vh",
    padding: "60px 30px",
    background: "linear-gradient(135deg, #ffe6f0, #fff0f5)"
  },

  title: {
    textAlign: "center",
    color: "#d63384",
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "5px"
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: "25px"
  },

  card: {
    maxWidth: "1100px",
    margin: "auto",
    background: "white",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 20px 45px rgba(214, 51, 132, 0.25)",
    border: "1px solid #ffd1e8"
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 12px"   // 👈 SPACE BETWEEN ROWS
  },

  headRow: {
    background: "linear-gradient(45deg, #ff4da6, #d63384)",
    color: "white",
    fontSize: "15px"
  },

  row: {
    background: "#fff5fa",
    borderRadius: "12px",
    transition: "0.3s",
    boxShadow: "0 3px 10px rgba(0,0,0,0.05)"
  },

  review: {
    maxWidth: "300px",
    wordBreak: "break-word"
  },

  rating: {
    background: "#ffe0f0",
    padding: "5px 10px",
    borderRadius: "20px",
    fontWeight: "bold",
    color: "#d63384"
  },

  button: {
    padding: "7px 14px",
    border: "none",
    borderRadius: "10px",
    background: "#ff2e63",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  }
};