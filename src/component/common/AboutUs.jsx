import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../../css/AboutUs.css";

function AboutUs() {
  return (
    <>
      <Header />

      <div className="about-wrapper">
        <div className="container text-center">

          <h1 className="main-heading">About Writing Mitra 💖</h1>
          <p className="sub-heading">
            Smart AI-Powered Writing Assistant
          </p>

          {/* 🔥 IMAGE CARDS */}
          <div className="row justify-content-center mt-5">

            <div className="col-md-4 mb-4">
              <div className="card-box">
                <img src="/vision.jpg" alt="vision" />
                <h4>Vision</h4>
                <p>Empowering students with AI writing tools.</p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card-box">
                <img src="/misson.avif" alt="mission" />
                <h4>Mission</h4>
                <p>Build a smart and easy writing platform.</p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card-box">
                <img src="/goale.jpg" alt="goal" />
                <h4>Goal</h4>
                <p>Make writing simple, fast and creative.</p>
              </div>
            </div>

          </div>

          {/* ⭐ FEATURES */}
          <div className="features-section mt-5">
            <h2>Our Features</h2>

            <div className="row mt-4">
              <div className="col-md-4">
                <div className="feature-box">
                  <h5>AI Writing</h5>
                  <p>Generate essays & content instantly.</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="feature-box">
                  <h5>Easy to Use</h5>
                  <p>Simple interface for beginners.</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="feature-box">
                  <h5>Fast Results</h5>
                  <p>Quick and accurate outputs.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default AboutUs;