import React, { useState } from 'react';
import UserHeader from './UserHeader';
import axios from 'axios';

function SearchBlog() {

  const [fetchBlog, setFetchBlog] = useState([]);
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!category) {
      alert("Please select a category");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:9090/user/blogs/category/${category}`
      );
      setFetchBlog(res.data);
    } catch (error) {
      console.log(error);
      setFetchBlog([]);
    }
  };

  const fetchAuthorBlogs = async (email) => {
    try {
      const res = await axios.get(
        `http://localhost:9090/user/blogs/email/${email}`
      );
      setFetchBlog(res.data);
    } catch (error) {
      console.log(error);
      alert("Author blogs not found");
    }
  };

  return (
    <>
      <UserHeader />

      <div style={styles.page}>

        <h1 style={styles.title}>🔍 Search Blogs</h1>
        <p style={styles.subtitle}>Find poems, stories & Shayari ✨</p>

        {/* FILTER BOX */}
        <form onSubmit={submitForm} style={styles.form}>

          <select style={styles.select} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="Poem">Poem</option>
            <option value="Shayari">Shayari</option>
            <option value="Ghazal">Ghazal</option>
          </select>

          <button type="submit" style={styles.button}>
            Search
          </button>

        </form>

        {/* BLOG GRID */}
        <div style={styles.grid}>

          {fetchBlog.length > 0 ? (

            fetchBlog.map((blog, index) => (

              <div key={index} style={styles.card}>

                <h3 style={styles.blogTitle}>📝 {blog.title}</h3>

                <p style={styles.author}>
                  ✍️ By{" "}
                  <span
                    style={styles.authorName}
                    onClick={() => fetchAuthorBlogs(blog.email)}
                  >
                    {blog.user?.name || "Unknown"}
                  </span>
                </p>

                <p style={styles.content}>
                  {blog.content?.length > 120
                    ? blog.content.substring(0, 120) + "..."
                    : blog.content}
                </p>

                <span style={styles.tag}>
                  {blog.category}
                </span>

              </div>

            ))

          ) : (
            <p style={styles.empty}>No blogs found 😔</p>
          )}

        </div>

      </div>
    </>
  );
}

export default SearchBlog;

/* ---------------- STYLES ---------------- */

const styles = {

  page: {
    minHeight: "100vh",
    padding: "100px 20px",
    background: "linear-gradient(135deg, #ffe6f0, #fff0f5)"
  },

  title: {
    textAlign: "center",
    color: "#d63384",
    fontSize: "32px",
    fontWeight: "bold"
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: "25px"
  },

  form: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px"
  },

  select: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none"
  },

  button: {
    padding: "10px 20px",
    background: "linear-gradient(45deg, #ff4da6, #d63384)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  },

  card: {
    width: "320px",
    background: "white",
    borderRadius: "18px",
    padding: "15px",
    boxShadow: "0 15px 35px rgba(214, 51, 132, 0.2)",
    border: "1px solid #ffd1e8"
  },

  blogTitle: {
    color: "#d63384",
    fontSize: "18px"
  },

  author: {
    fontSize: "13px",
    color: "#666"
  },

  authorName: {
    color: "#0d6efd",
    cursor: "pointer",
    fontWeight: "bold"
  },

  content: {
    color: "#555",
    marginTop: "10px"
  },

  tag: {
    display: "inline-block",
    marginTop: "10px",
    padding: "5px 10px",
    borderRadius: "20px",
    background: "#ffe0f0",
    color: "#d63384",
    fontSize: "12px",
    fontWeight: "bold"
  },

  empty: {
    textAlign: "center",
    color: "#999"
  }
};