import React, { useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import axios from "axios";
import { useLocation } from "react-router-dom";
import defaultProfilePic from "../../assets/pic2.webp";

function UserDashBoard() {

  const email = localStorage.getItem("userEmail");
  const location = useLocation();

  const APIURL = `http://localhost:9090/user/userProfile/${email}`;

  const [userData, setUserData] = useState({ name: "", phone: "", city: "" });
  const [profilePic, setProfilePic] = useState(defaultProfilePic);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await axios.get(APIURL);

        setUserData(response.data);

        let imageUrl = defaultProfilePic;

        if (location.state?.imageURL) {
          imageUrl = location.state.imageURL;
        }
        else if (response.data.profilePic) {
          imageUrl = `http://localhost:9090/uploads/profileimages/${response.data.profilePic}`;
        }

        setProfilePic(imageUrl);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, []);

  return (
    <>
      <UserHeader />

      <div style={styles.page}>

        <div style={styles.card}>

          {/* PROFILE IMAGE */}
          <img
            src={profilePic}
            alt="profile"
            style={styles.image}
          />

          {/* NAME */}
          <h2 style={styles.name}>
            👋 Hello {userData.name}
          </h2>

          {/* DETAILS */}
          <div style={styles.infoBox}>

            <p>📧 {email}</p>
            <p>📞 {userData.phone}</p>
            <p>🏙️ {userData.city}</p>

          </div>

        </div>

      </div>
    </>
  );
}

export default UserDashBoard;

/* ---------------- STYLES ---------------- */

const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ffe6f0, #fff0f5)",
    padding: "20px"
  },

  card: {
    width: "350px",
    background: "white",
    borderRadius: "20px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 15px 35px rgba(214, 51, 132, 0.25)",
    border: "1px solid #ffd1e8"
  },

  image: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #d63384",
    marginBottom: "15px"
  },

  name: {
    color: "#d63384",
    fontSize: "22px",
    marginBottom: "15px"
  },

  infoBox: {
    background: "#fff5fa",
    padding: "15px",
    borderRadius: "12px",
    fontSize: "15px",
    color: "#444",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  }
};