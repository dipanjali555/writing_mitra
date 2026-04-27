import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import Footer from "../common/Footer";
import { useNavigate } from "react-router-dom";

function CompetitionNotice() {
  const APIURL = "http://localhost:9090/admin/addNotice";
  const navigate = useNavigate();

  const [notice, setNotice] = useState({
    title: "",
    openingdate: "",
    closingdate: "",
    description: "",
    rules: ""
  });

  const fetchData = (e) => {
    setNotice({ ...notice, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(APIURL, notice);

      alert("Notice Added Successfully 💖");

      localStorage.setItem("id", res.data.id);
      localStorage.setItem("title", notice.title);
      localStorage.setItem("userEmail", "user@gmail.com");

      setNotice({
        title: "",
        openingdate: "",
        closingdate: "",
        description: "",
        rules: ""
      });
    } catch (error) {
      console.log(error);
      alert("Error ❌");
    }
  };

  const goToParticipate = () => {
    navigate("/participate");
  };

  return (
    <>
      <AdminHeader />

      {/* PAGE WRAPPER */}
      <div className="page">

        {/* CONTENT */}
        <div className="content">
          <form onSubmit={submitForm} className="card">
            <h2>🏆 Competition Notice</h2>

            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              value={notice.title}
              onChange={fetchData}
              required
            />

            <div className="row">
              <input
                type="date"
                name="openingdate"
                value={notice.openingdate}
                onChange={fetchData}
                required
              />

              <input
                type="date"
                name="closingdate"
                value={notice.closingdate}
                onChange={fetchData}
                required
              />
            </div>

            <textarea
              name="description"
              placeholder="Enter Description"
              value={notice.description}
              onChange={fetchData}
              required
            />

            <textarea
              name="rules"
              placeholder="Enter Rules"
              value={notice.rules}
              onChange={fetchData}
              required
            />

            <button type="submit">📢 Submit Notice</button>

            <button type="button" onClick={goToParticipate} className="secondary">
              🎯 Go to Participate
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>

      {/* CSS */}
      <style>{`
        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #ffe6f0, #fff0f5);
          padding-top: 80px;
        }

        .content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .card {
          width: 100%;
          max-width: 500px;
          background: #fff;
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .card h2 {
          text-align: center;
          color: #c2185b;
        }

        input, textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 10px;
          outline: none;
        }

        textarea {
          min-height: 80px;
          resize: none;
        }

        .row {
          display: flex;
          gap: 10px;
        }

        .row input {
          flex: 1;
        }

        button {
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: #c2185b;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        button:hover {
          background: #a3154a;
        }

        .secondary {
          background: #ff69b4;
        }

        .secondary:hover {
          background: #ff4fa0;
        }

        /* RESPONSIVE */
        @media (max-width: 600px) {
          .row {
            flex-direction: column;
          }

          .card {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}

export default CompetitionNotice;