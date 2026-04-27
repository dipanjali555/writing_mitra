import Header from './Header'
import Footer from './Footer'
import { useState } from 'react'
import axios from 'axios'
import '../../css/contact.css'

function ContactUs() {

    const APIURL = "http://localhost:9090/addContact"

    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        question: ""
    })

    const [msg, setMsg] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    // ✅ VALIDATION
    const validateForm = () => {

        const { name, email, phone, question } = data

        if (!name || !email || !phone || !question) {
            setMsg("All fields are required ❌")
            return false
        }

        if (!/^[A-Za-z\s]+$/.test(name)) {
            setMsg("Name must contain only letters ❌")
            return false
        }

        if (!/^[0-9]+$/.test(phone)) {
            setMsg("Phone must contain only digits ❌")
            return false
        }

        if (phone.length !== 10) {
            setMsg("Phone number must be exactly 10 digits ❌")
            return false
        }

        return true
    }

    const submitForm = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        try {
            await axios.post(APIURL, data)

            // ✅ NO POPUP — ONLY MESSAGE
            setMsg("Your message has been reviewed ✅")

            setData({
                name: "",
                email: "",
                phone: "",
                question: ""
            })

        } catch (error) {
            setMsg("Something went wrong ❌")
        }
    }

    return (
        <>
            <Header />

            <div className="contact-bg">

                <div className="contact-wrapper">

                    <div className="contact-card">

                        <h2 className="contact-title">Contact Us 💖</h2>

                        <form onSubmit={submitForm}>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    placeholder="Enter Name"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder="Enter Email"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="phone"
                                    value={data.phone}
                                    onChange={handleChange}
                                    placeholder="Enter Phone"
                                />
                            </div>

                            <div className="form-group">
                                <textarea
                                    name="question"
                                    value={data.question}
                                    onChange={handleChange}
                                    placeholder="Your Question..."
                                ></textarea>
                            </div>

                            <button className="submit-btn">Send Message</button>

                        </form>

                        {/* ✅ MESSAGE SHOW HERE */}
                        {msg && <p className="success-msg">{msg}</p>}

                    </div>

                </div>

                <div className="map-section">
                    <iframe
                        src="https://www.google.com/maps?q=Lucknow&output=embed"
                        width="100%"
                        height="280"
                        style={{ border: 0 }}
                        title="map"
                    ></iframe>
                </div>

            </div>

            <Footer />
        </>
    )
}

export default ContactUs