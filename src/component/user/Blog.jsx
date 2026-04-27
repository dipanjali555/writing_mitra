import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import UserHeader from "./UserHeader";

function Blog() {

  const navigate = useNavigate();
  const APIURL = "http://localhost:9090/user/addBlog";

  const [blog, setBlog] = useState({
    email: "",
    title: "",
    category: "",
    content: ""
  });

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(APIURL, blog);

      Swal.fire("Success", "Blog Submitted Successfully ✍", "success");

      setBlog({
        email: "",
        title: "",
        category: "",
        content: ""
      });

      navigate("/blogDashboard", { state: { email: response.data.email } });

    } catch (err) {
      Swal.fire("Error", "Blog Submission Failed ❌", "error");
    }
  };

  return (
    <>
      <UserHeader />

      <div style={styles.page}>

        <div style={styles.card}>

          <h2 style={styles.title}>✍ Create Your Blog</h2>
          <p style={styles.subtitle}>Share your thoughts with world 🌍</p>

          <form onSubmit={handleSubmit} style={styles.form}>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={blog.email}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              value={blog.title}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <select
              name="category"
              value={blog.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Category</option>
              <option value="Poem">Poem</option>
              <option value="Story">Story</option>
              <option value="Shayari">Shayari</option>
              <option value="Ghazal">Ghazal</option>
            </select>

            <textarea
              name="content"
              placeholder="Write your blog here..."
              value={blog.content}
              onChange={handleChange}
              rows="5"
              style={styles.textarea}
              required
            />

            <button type="submit" style={styles.button}>
              🚀 Publish Blog
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default Blog;

/* ---------------- STYLES ---------------- */

const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",   // 👈 TOP ALIGN
    background: "linear-gradient(135deg, #ffe6f0, #fff0f5)",
    padding: "100px 20px 40px"  // 👈 TOP MARGIN FIX
  },

  card: {
    width: "450px",
    background: "white",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 15px 35px rgba(214, 51, 132, 0.25)",
    border: "1px solid #ffd1e8",
    textAlign: "center"
  },

  title: {
    color: "#d63384",
    fontSize: "26px",
    fontWeight: "bold"
  },

  subtitle: {
    color: "#777",
    marginBottom: "20px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ffd1e8",
    background: "#fff5fa",
    outline: "none"
  },

  textarea: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ffd1e8",
    background: "#fff5fa",
    outline: "none",
    resize: "none"
  },

  button: {
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(45deg, #ff4da6, #d63384)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px"
  }
};