import AdminHeader from "./AdminHeader"
import axios from "axios"
import { useEffect, useState } from "react"
import ContactDetail from "./ContactDetail"

function AllContacts() {

  const APIURL = "http://localhost:9090/admin/contacts"

  const [contactdata, setContactData] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const serverResponse = await axios.get(APIURL)
        setContactData(serverResponse.data)
      }
      catch (err) {
        console.log(err)
      }
    }

    fetchData()

  }, [])

  const deleteContact = async (id) => {

    const DELETEAPI = `http://localhost:9090/admin/deleteContact/${id}`

    try {
      await axios.delete(DELETEAPI)

      const updatedArray = contactdata.filter((cobj) => cobj.id !== id)
      setContactData(updatedArray)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <AdminHeader />

      {/* BACKGROUND */}
      <div
        style={{
          minHeight: "100vh",
          background: "#ffe6f0",
          paddingTop: "90px",
          paddingBottom: "40px"
        }}
      >

        {/* TITLE */}
        <h2
          style={{
            textAlign: "center",
            color: "#c2185b",
            fontWeight: "bold",
            marginBottom: "20px"
          }}
        >
          📞 All Contacts
        </h2>

        {/* CARD WRAPPER */}
        <div
          style={{
            width: "90%",
            margin: "auto",
            background: "#fff",
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
          }}
        >

          <ContactDetail
            contactArray={contactdata}
            deleteById={deleteContact}
          />

        </div>

      </div>
    </>
  )
}

export default AllContacts