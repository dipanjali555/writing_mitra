import axios from 'axios'
import { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function AdminEditProfile() {

  const email = localStorage.getItem("adminEmail")

  const APIURL = `http://localhost:9090/admin/adminProfile/${email}`
  const EDITAPIURL = `http://localhost:9090/admin/editProfile/${email}`

  const [admindata, setAdmindata] = useState({ name: "", phone: "" })
  const navigate = useNavigate()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const serverResponse = await axios.get(APIURL)

        setAdmindata({
          name: serverResponse.data.name || "",
          phone: serverResponse.data.phone || ""
        })

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()

  }, [])

  const submitData = async (e) => {
    e.preventDefault()

    try {
      await axios.put(EDITAPIURL, admindata)

      toast.success("Profile Updated Successfully 🌸")

      setTimeout(() => {
        navigate("/admindashboard")
      }, 1500)

    } catch (error) {
      console.log(error)
      toast.error("Update Failed ❌")
    }
  }

  const fillData = (e) => {
    setAdmindata({
      ...admindata,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <AdminHeader />

      <ToastContainer position='top-center' autoClose={1500} />

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
            width: "420px",
            background: "#fff",
            borderRadius: "18px",
            padding: "30px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
          }}
        >

          {/* TITLE */}
          <h3 style={{
            textAlign: "center",
            color: "#c2185b",
            marginBottom: "25px",
            fontWeight: "bold"
          }}>
            ✏️ Edit Admin Profile
          </h3>

          <form onSubmit={submitData}>

            {/* NAME */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ fontWeight: "bold", color: "#333" }}>Name</label>
              <input
                type="text"
                name="name"
                value={admindata.name}
                onChange={fillData}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  outline: "none",
                  marginTop: "5px"
                }}
              />
            </div>

            {/* PHONE */}
            <div style={{ marginBottom: "25px" }}>
              <label style={{ fontWeight: "bold", color: "#333" }}>Phone</label>
              <input
                type="text"
                name="phone"
                value={admindata.phone}
                onChange={fillData}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  outline: "none",
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
                cursor: "pointer",
                transition: "0.3s"
              }}
            >
              💾 Save Changes
            </button>

          </form>

        </div>

      </div>
    </>
  )
}

export default AdminEditProfile