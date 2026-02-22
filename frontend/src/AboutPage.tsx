import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./AboutPage.module.css";

const AboutPage = () => {
  // External JS removed for React-only compatibility

  return (
    <>
      <section className={styles.about}>
        <div className="about-values-container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              {/* Responsive, CDN-ready, compressed image */}
              <img
                src="https://cdn.example.com/images/value-excellence.webp"
                srcSet="https://cdn.example.com/images/value-excellence-small.webp 480w, https://cdn.example.com/images/value-excellence-medium.webp 800w, https://cdn.example.com/images/value-excellence-large.webp 1200w"
                sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
                alt="Excellence"
                className="value-icon"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <h3>Excellence</h3>
              <p>Pursuing the highest standards in technology, delivery, and client satisfaction.</p>
            </div>
            <div className="value-card">
              <img src={process.env.PUBLIC_URL + "/images/value-innovation.png"} alt="Innovation" className="value-icon" />
              <h3>Innovation</h3>
              <p>Leveraging the latest tech to solve modern business challenges and unlock new potential.</p>
            </div>
            <div className="value-card">
              <img src={process.env.PUBLIC_URL + "/images/value-integrity.png"} alt="Integrity" className="value-icon" />
              <h3>Integrity</h3>
              <p>Honest, transparent, and respectful in all our relationships and business practices.</p>
            </div>
            <div className="value-card">
              <img src={process.env.PUBLIC_URL + "/images/value-teamwork.png"} alt="Teamwork" className="value-icon" />
              <h3>Teamwork</h3>
              <p>Collaboration, mentorship, and mutual growth are at the core of our culture.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Qubit Cloud Section */}
      <section className="about-cta-section">
        <div className="about-cta-container">
          <h2>Why Choose Qubit Cloud?</h2>
          <ul className="about-cta-list">
            <li>Agile Product Teams On Demand</li>
            <li>Full-Cycle Development: Idea to Launch</li>
            <li>Cutting-Edge Tech Expertise</li>
            <li>Flexible Engagement Models</li>
            <li>Commitment to Quality and Security</li>
          </ul>
          <Link to="/contact" className="button primary">Let’s Work Together</Link>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
