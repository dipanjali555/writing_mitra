import React, { useEffect, useState } from "react";
import UserHeader from "./UserHeader";

import axios from "axios";
import { useLocation } from "react-router-dom";
import defaultProfilePic from "../../assets/pic2.webp";

function UserDashBoard() {

  const email = localStorage.getItem("userEmail");
  const location = useLocation();

  const APIURL = `http://localhost:9090/user/userProfile/${email}`;

  const [userData, setUserData] = useState({ name: "", phone: "" });
  const [profilePic, setProfilePic] = useState(defaultProfilePic);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await axios.get(APIURL);

        setUserData(response.data);

        let imageUrl = defaultProfilePic;

        // If image came after upload
        if (location.state?.imageURL) {
          imageUrl = location.state.imageURL;
        }

        // If image exists in database
        else if (response.data.profilePic) {
          imageUrl = `http://localhost:9090/uploads/profileimages/${response.data.profilePic}`;
        }

        setProfilePic(imageUrl);

      } catch (error) {
        console.log("Error fetching user data:", error);
      }

    };

    fetchData();

  }, []);

  return (
    <>
      <UserHeader />

      <div className="main-div">
        <div
          className="d-flex"
          style={{
            marginLeft: "120px",
            marginTop: "70px",
            alignItems: "center"
          }}
        >

          <img
            src={profilePic}
            alt="profile"
            width="120"
            style={{ borderRadius: "50%", marginRight: "10px" }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px"
            }}
          >
            <span><i className="fas fa-user-circle"></i> Hello {userData.name}</span>
            <span><i className="fas fa-user-circle"></i> {email}</span>
            <span><i className="fas fa-phone"></i> {userData.phone}</span>
          </div>

        </div>
      </div>
    </>
  );
}

export default UserDashBoard;