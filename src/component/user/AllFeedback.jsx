import UserHeader from "./UserHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import FeedbackDetail from "./FeedbackDetail";

function AllFeedback() {

  const APIURL = "http://localhost:9090/user/allFeedback";
  const [feedbackdata, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servaerResponse = await axios.get(APIURL);
        setFeedbackData(servaerResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const deleteFeedback = async (id) => {
    const DELETEAPI = `http://localhost:9090/user/deleteFeedback/${id}`;

    try {
      await axios.delete(DELETEAPI);

      const updatedArray = feedbackdata.filter((fobj) => fobj.id !== id);
      setFeedbackData(updatedArray);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <UserHeader />

      <div style={styles.page}>

        <div style={styles.container}>

          <h1 style={styles.title}>💬 All Feedback</h1>
          <p style={styles.subtitle}>See what users are saying about us ✨</p>

          <FeedbackDetail
            feedbackArray={feedbackdata}
            deleteById={deleteFeedback}
          />

        </div>

      </div>
    </>
  );
}

export default AllFeedback;



const styles = {

  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ffe6f0, #fff0f5)",
    paddingTop: "90px",   
    paddingBottom: "40px"
  },

  container: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "20px"
  },

  title: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#d63384",
    marginBottom: "5px"
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: "25px"
  }
};