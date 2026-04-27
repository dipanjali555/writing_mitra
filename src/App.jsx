import React from "react";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import FetchFeedback from "./component/common/FetchFeedback";
import heroImg from "./assets/Home.jpg";
import "./css/style.css";

function App() {
  return (
    <>
      <Header />

      {/* 🔥 HERO SECTION */}
      <div
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(255,240,246,0.7), rgba(255,240,246,0.7)), url(${heroImg})`
        }}
      >
        <div className="hero-content">
          <h1>Welcome 🌸</h1>
          <p>Enjoy Shayari & Beautiful Ghazals</p>
          
        </div>
      </div>

      {/* 🎥 VIDEO SECTION */}
      <div className="video-section">
        <h2>Shayari & Ghazal 🎶</h2>

        <div className="videos">
          <div className="video-card">
            <iframe
              src="https://www.youtube.com/embed/1ZYbU82GVz4"
              title="video1"
              allowFullScreen
            ></iframe>
            <p>Beautiful Shayari</p>
          </div>

          <div className="video-card">
            <iframe
              src="https://www.youtube.com/embed/3hXb1G7jz9I"
              title="video2"
              allowFullScreen
            ></iframe>
            <p>Heart Touching Ghazal</p>
          </div>

          <div className="video-card">
            <iframe
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
              title="video3"
              allowFullScreen
            ></iframe>
            <p>Emotional Poetry</p>
          </div>
        </div>
      </div>

      {/* ⭐ FEEDBACK */}
      <FetchFeedback />

      <Footer />
    </>
  );
}

export default App;