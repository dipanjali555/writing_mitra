import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";

function Participate() {

  const APIURL = "http://localhost:9090/user/participate";

  const id = localStorage.getItem("id");
  const title = localStorage.getItem("title");
  const useremail = localStorage.getItem("userEmail");

  const navigate = useNavigate();

  const [data, setData] = useState({
    compId: id || "",
    email: useremail || "",
    phone: "",
    title: title || "",
    content: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...data,
      compId: parseInt(id)
    };

    try {
      await axios.post(APIURL, finalData);
      alert("Participation Submitted ✅");
      navigate("/competitionNotice");
    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  return (
    <>
      <UserHeader />

      <div style={styles.page}>

        <form onSubmit={handleSubmit} style={styles.card}>

          <h2 style={styles.title}>🏆 Participate Now</h2>
          <p style={styles.sub}>Show your talent and win rewards ✨</p>

          <input value={data.compId} readOnly style={styles.input} />

          <input value={data.email} readOnly style={styles.input} />

          <input
            type="text"
            name="phone"
            placeholder="Enter Phone"
            value={data.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            value={data.title}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <textarea
            name="content"
            placeholder="Write your content..."
            value={data.content}
            onChange={handleChange}
            style={styles.textarea}
            required
          />

          <button style={styles.button}>
            🚀 Submit Participation
          </button>

        </form>

      </div>
    </>
  )
}

export default Participate;

/* ---------------- STYLE ---------------- */

const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",   // 👈 important
    background: "linear-gradient(135deg, #ffe6f0, #fff0f5)",
    padding: "20px",
    marginTop: "80px"           // 👈 fixed top spacing
  },

  card: {
    width: "420px",
    background: "white",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 15px 40px rgba(214, 51, 132, 0.25)",
    border: "1px solid #ffd1e8"
  },

  title: {
    textAlign: "center",
    color: "#d63384",
    marginBottom: "5px"
  },

  sub: {
    textAlign: "center",
    fontSize: "13px",
    color: "#777",
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none"
  },

  textarea: {
    width: "100%",
    padding: "10px",
    height: "100px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginBottom: "12px",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(45deg, #ff4da6, #d63384)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};