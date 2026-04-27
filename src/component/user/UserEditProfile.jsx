import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";

function UserProfileUpload() {

    const navigate = useNavigate();
    const UPLOADURL = "http://localhost:9090/user/uploadPic";

    const [profilePic, setProfilePic] = useState(null);

    const email = localStorage.getItem("userEmail");

    const [profileData, setProfileData] = useState({
        email: email,
        description: ""
    });

    const fetchData = (e) => {
        const { name, value, files, type } = e.target;

        if (type === "file") {
            setProfilePic(files[0]);
        } else {
            setProfileData({ ...profileData, [name]: value });
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append(
            "profileImageDetail",
            new Blob([JSON.stringify(profileData)], { type: "application/json" })
        );

        formData.append("imageFile", profilePic);

        try {
            const serverResponse = await axios.post(UPLOADURL, formData);

            navigate("/userDashBoard", {
                state: { imageURL: serverResponse.data.imageURL }
            });

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <UserHeader />

            <div style={styles.page}>

                <div style={styles.card}>

                    <h2 style={styles.title}>📸 Upload Profile</h2>
                    <p style={styles.subtitle}>Make your profile shine ✨</p>

                    <form onSubmit={submitForm}>

                        {/* IMAGE INPUT */}
                        <div style={styles.box}>
                            <label style={styles.label}>Select Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                name="profilePic"
                                onChange={fetchData}
                                style={styles.input}
                                required
                            />
                        </div>

                        {/* DESCRIPTION */}
                        <div style={styles.box}>
                            <label style={styles.label}>Description</label>
                            <textarea
                                name="description"
                                rows="4"
                                placeholder="Write about yourself..."
                                value={profileData.description}
                                onChange={fetchData}
                                style={styles.textarea}
                            />
                        </div>

                        {/* BUTTON */}
                        <button type="submit" style={styles.button}>
                            🚀 Upload Image
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
}

export default UserProfileUpload;

/* ---------------- STYLES ---------------- */

const styles = {

    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "80px",
        background: "linear-gradient(135deg, #ffe6f0, #fff0f5)"
    },

    card: {
        width: "420px",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        padding: "30px",
        borderRadius: "22px",
        boxShadow: "0 20px 50px rgba(214, 51, 132, 0.25)",
        border: "1px solid #ffd1e8"
    },

    title: {
        textAlign: "center",
        color: "#d63384",
        marginBottom: "5px"
    },

    subtitle: {
        textAlign: "center",
        color: "#777",
        marginBottom: "20px"
    },

    box: {
        marginBottom: "15px"
    },

    label: {
        fontWeight: "bold",
        fontSize: "14px",
        color: "#444"
    },

    input: {
        width: "100%",
        marginTop: "5px",
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #ddd"
    },

    textarea: {
        width: "100%",
        marginTop: "5px",
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        resize: "none"
    },

    button: {
        width: "100%",
        padding: "12px",
        marginTop: "10px",
        background: "linear-gradient(45deg, #ff4da6, #d63384)",
        color: "white",
        border: "none",
        borderRadius: "10px",
        fontWeight: "bold",
        cursor: "pointer"
    }
};