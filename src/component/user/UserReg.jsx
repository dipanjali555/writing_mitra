import Header from "../common/Header";
import Footer from "../common/Footer";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function UserReg() {

    const APIURL = "http://localhost:9090/user/registration";

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        city: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        const alphaRegex = /^[A-Za-z\s]*$/;
        const numberRegex = /^[0-9]*$/;

        if (name === "name" && !alphaRegex.test(value)) {
            Swal.fire("Error", "Only alphabets allowed in name ❌", "error");
            return;
        }

        if (name === "phone" && !numberRegex.test(value)) {
            Swal.fire("Error", "Only digits allowed in phone ❌", "error");
            return;
        }

        setData({ ...data, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        // ✅ EMPTY CHECK
        if (!data.name || !data.email || !data.password || !data.phone || !data.city) {
            Swal.fire("Error", "All fields are required ❌", "error");
            return;
        }

        try {
            const res = await axios.post(APIURL, data);

            console.log("Backend Response:", res.data);

            // ✅ SAFE CHECK (NO EXACT MATCH ISSUE)
            const responseText = (res.data || "").toString().toLowerCase();

            if (responseText.includes("exist")) {
                Swal.fire("Error", "Email already Exist! ❌", "error");
                return;
            }

            if (responseText.includes("success") || responseText.includes("register")) {
                Swal.fire("Success", "Registration Successful ✅", "success");

                setData({
                    name: "",
                    email: "",
                    password: "",
                    phone: "",
                    city: ""
                });

                return;
            }

            // fallback
            Swal.fire("Error", "Registration Failed ❌", "error");

        } catch (error) {
            Swal.fire("Error", "Server Error ❌", "error");
        }
    };

    return (
        <>
            <Header />

            <div style={styles.page}>

                <div style={styles.card}>

                    <h2 style={styles.title}>📝 Create Account</h2>
                    <p style={styles.subtitle}>Join Writing Mitra</p>

                    <form onSubmit={submitForm} style={styles.form}>

                        <input
                            style={styles.input}
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                        />

                        <input
                            style={styles.input}
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                        />

                        <input
                            style={styles.input}
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                        />

                        <input
                            style={styles.input}
                            type="text"
                            placeholder="Phone Number"
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                        />

                        <select
                            style={styles.input}
                            name="city"
                            value={data.city}
                            onChange={handleChange}
                        >
                            <option value="">Select City</option>
                            <option>Lucknow</option>
                            <option>Delhi</option>
                            <option>Mumbai</option>
                            <option>Kanpur</option>
                        </select>

                        <button type="submit" style={styles.button}>
                            Register Now 🚀
                        </button>

                    </form>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default UserReg;

/* ================= STYLES ================= */

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
        width: "380px",
        background: "white",
        padding: "25px",
        borderRadius: "20px",
        boxShadow: "0 15px 35px rgba(214, 51, 132, 0.25)",
        textAlign: "center"
    },

    title: {
        color: "#d63384",
        fontSize: "26px",
        fontWeight: "bold"
    },

    subtitle: {
        color: "#777",
        marginBottom: "20px"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },

    input: {
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #ffd1e8",
        outline: "none",
        background: "#fff5fa",
        fontSize: "14px"
    },

    button: {
        marginTop: "10px",
        padding: "10px",
        border: "none",
        borderRadius: "10px",
        background: "linear-gradient(45deg, #ff4da6, #d63384)",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
    }
};