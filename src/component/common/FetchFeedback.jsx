import axios from "axios"
import { useState, useEffect } from "react"
import FetchFeedbackDetails from "./FetchFeedbackDetails"

function FetchFeedback() {

    const APIURL = "http://localhost:9090/fetchFeedback"

    const [feedbackdata, setFeedbackData] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            try {
                const serverResponse = await axios.get(APIURL)
                console.log(serverResponse.data)
                setFeedbackData(serverResponse.data)
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchData()

    }, [])

    return (
        <>

            {/* 🎨 STYLISH HEADING */}
            <div style={styles.headingBox}>
                <h2 style={styles.heading}>
                     All Feedback Details
                </h2>
            </div>

            {/* FEEDBACK COMPONENT */}
            <FetchFeedbackDetails feedbackArray={feedbackdata} />

        </>
    )
}

export default FetchFeedback

/* ---------------- STYLES ---------------- */

const styles = {

    headingBox: {
        display: "flex",
        justifyContent: "center",
        marginTop: "30px"
    },

    heading: {
        fontSize: "32px",
        fontWeight: "bold",
        color: "#d63384",
        background: "linear-gradient(45deg, #ffe6f0, #fff0f5)",
        padding: "15px 25px",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(214, 51, 132, 0.2)",
        border: "1px solid #ffd1e8",
        textAlign: "center"
    }
};