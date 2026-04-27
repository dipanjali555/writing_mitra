import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function ProfileUpload() {

    const navigate = useNavigate()
    const fileRef = useRef(null)

    const UPLOADURL = "http://localhost:9090/admin/uploadPic"

    const [profilePic, setProfilePic] = useState(null)
    const email = localStorage.getItem("adminEmail")

    const [profileData, setProfileData] = useState({
        email: email,
        description: ""
    })

    const fetchData = (e) => {
        const { name, value, files, type } = e.target

        const maxSize = 2 * 1024 * 1024
        const allowedTypes = ["image/png", "image/jpg", "image/jpeg"]

        if (type === "file") {

            const file = files[0]
            if (!file) return

            if (file.size > maxSize) {
                alert("File size must be less than 2MB")
                setProfilePic(null)
                fileRef.current.value = ""
                return
            }

            if (!allowedTypes.includes(file.type)) {
                alert("Only JPG, JPEG, PNG allowed")
                setProfilePic(null)
                fileRef.current.value = ""
                return
            }

            setProfilePic(file)

        } else {
            setProfileData({ ...profileData, [name]: value })
        }
    }

    const submitForm = async (e) => {
        e.preventDefault()

        if (!profilePic) {
            alert("Please select image")
            return
        }

        const formData = new FormData()

        formData.append(
            "profileImageDetail",
            new Blob([JSON.stringify(profileData)], { type: 'application/json' })
        )

        formData.append("imageFile", profilePic)

        try {
            const res = await axios.post(UPLOADURL, formData)

            navigate("/adminDashBoard", {
                state: { imageURL: res.data.imageURL }
            })

        } catch (err) {
            console.log(err)
            alert("Upload failed")
        }
    }

    return (
        <>
            

            {/* BACKGROUND */}
            <div
                style={{
                    minHeight: "100vh",
                    background: "#ffe6f0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "80px"
                }}
            >

                {/* CARD */}
                <div
                    style={{
                        width: "450px",
                        background: "#fff",
                        borderRadius: "18px",
                        padding: "30px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                    }}
                >

                    <h3
                        style={{
                            textAlign: "center",
                            color: "#c2185b",
                            fontWeight: "bold",
                            marginBottom: "20px"
                        }}
                    >
                        📸 Upload Profile Picture
                    </h3>

                    <form onSubmit={submitForm}>

                        {/* FILE INPUT */}
                        <div style={{ marginBottom: "15px" }}>
                            <label style={{ fontWeight: "bold" }}>
                                Select Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                name="profilePic"
                                onChange={fetchData}
                                ref={fileRef}
                                required
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    border: "1px solid #ddd",
                                    marginTop: "5px"
                                }}
                            />
                        </div>

                        {/* DESCRIPTION */}
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ fontWeight: "bold" }}>
                                Description
                            </label>

                            <textarea
                                name="description"
                                placeholder="Write something about your profile..."
                                onChange={fetchData}
                                value={profileData.description}
                                rows="4"
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    border: "1px solid #ddd",
                                    marginTop: "5px"
                                }}
                            />
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "12px",
                                border: "none",
                                borderRadius: "10px",
                                background: "#ff69b4",
                                color: "white",
                                fontWeight: "bold",
                                cursor: "pointer"
                            }}
                        >
                            📤 Upload Image
                        </button>

                    </form>

                </div>

            </div>
        </>
    )
}

export default ProfileUpload