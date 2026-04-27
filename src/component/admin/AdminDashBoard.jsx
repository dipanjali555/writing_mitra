import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultProfilePic from "../../assets/pic2.webp";


function AdminDashBoard() {

  const email = localStorage.getItem("adminEmail");

  console.log(email);
  
  useEffect(()=>{
  if(email === null )
    navigate("/admin")
  },[])
  const navigate = useNavigate();

  const APIURL = `http://localhost:9090/admin/adminProfile/${email}`;

  const [adminData, setAdminData] = useState({ name: "", phone: "" });
  const [profilePic, setProfilePic] = useState(defaultProfilePic);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(APIURL);
        setAdminData(res.data);

        if (res.data.profilePic) {
          setProfilePic(
            `http://localhost:9090/uploads/profileimages/${res.data.profilePic}`
          );
        }

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AdminHeader />

      <div style={styles.container}>

        <div style={styles.card}>

          {/* PROFILE IMAGE */}
          <img src={profilePic} style={styles.image} />

          <h2>👋 Welcome {adminData.name}</h2>
          <p>📧 {email}</p>
          <p>📞 {adminData.phone}</p>

          {/* ALL LINKS */}
          <div style={styles.grid}>

            <div style={styles.box} onClick={() => navigate("/admindashboard")}>
              🏠 Dashboard
            </div>

            <div style={styles.box} onClick={() => navigate("/allcontacts")}>
              📞 Contacts
            </div>

            <div style={styles.box} onClick={() => navigate("/user/allfeedback")}>
              💬 Feedback
            </div>

            <div style={styles.box} onClick={() => navigate("/allcompetition")}>
              🏆 Competition
            </div>

            <div style={styles.box} onClick={() => navigate("/competitionNotice")}>
              📢 Notices
            </div>

            <div style={styles.box} onClick={() => navigate("/participate")}>
              🧑‍🤝‍🧑 Participations
            </div>

            <div style={styles.box} onClick={() => navigate("/user/ourwinners")}>
              🎉 Winners
            </div>

            <div style={styles.box} onClick={() => navigate("/profileUpload")}>
              📸 Upload Profile
            </div>

            <div style={styles.box} onClick={() => navigate("/changepassword")}>
              ⚙️ Change Password
            </div>

            <div style={styles.box} onClick={() => navigate("/adminEditProfile")}>
              ✏️ Edit Profile
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default AdminDashBoard;

/* STYLES */
const styles = {
  container: {
    marginTop: "60px",
    minHeight: "100vh",
    background: "#ffe6f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    textAlign: "center",
    width: "550px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },

  image: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #ff69b4",
    marginBottom: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "12px",
    marginTop: "20px",
  },

  box: {
    background: "#ffc0cb",
    padding: "14px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.2s",
  },
};