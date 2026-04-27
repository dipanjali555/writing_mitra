import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";

import Header from "../common/Header";
import Footer from "../common/Footer";

import AllCompetitionDetail from "./AllCompetitionDetail";

function AllCompetition() {

  const [allCompetition, setAllCompetition] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:9090/admin/notices");
        setAllCompetition(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* HEADER */}
      <Header />
      <AdminHeader />

      {/* MAIN CONTENT */}
      <div style={styles.page}>
        <h2 style={styles.heading}>🎯 All Competitions</h2>

        <AllCompetitionDetail competitionArray={allCompetition} />
      </div>

      {/* FOOTER ONLY ONCE */}
      <Footer />
    </>
  );
}

export default AllCompetition;

/* ---------------- STYLES ---------------- */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "25px",
    background: "linear-gradient(135deg, #ffe6f0, #ffd1e8)"
  },

  heading: {
    textAlign: "center",
    color: "#d63384",
    fontSize: "28px",
    marginBottom: "20px",
    fontWeight: "bold"
  }
};