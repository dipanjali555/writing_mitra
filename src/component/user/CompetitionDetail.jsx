import React from 'react'
import { useNavigate } from "react-router-dom";

function CompetitionNoticeDetail({ noticeArray }) {

  const navigate = useNavigate();

  const participate = (id, title) => {

    
    localStorage.setItem("id", id);
    localStorage.setItem("title", title);
    localStorage.setItem("userEmail", "user@gmail.com");

    
    navigate("/participate");
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2 style={{ textAlign: "center" }}>Competition List</h2>

      {
        noticeArray.length === 0 ? (
          <p style={{ textAlign: "center" }}>No Data Found ❌</p>
        ) : (
          noticeArray.map((comobj) => (

            <div key={comobj.id} style={{
              border: "1px solid #ccc",
              margin: "20px",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}>

              <h3>{comobj.title}</h3>
              <p>{comobj.description}</p>

              <button
                className="btn btn-success"
                onClick={() => participate(comobj.id, comobj.title)}
              >
                Participate Now 🚀
              </button>

            </div>

          ))
        )
      }

    </div>
  )
}

export default CompetitionNoticeDetail;