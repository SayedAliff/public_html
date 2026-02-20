import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import "./css/sidebar.css";
import "./css/scroll.css";

const AboutPage = () => {
  useEffect(() => {
    // Dynamically load JS for compatibility (migration phase)
    const script1 = document.createElement("script");
    script1.src = process.env.PUBLIC_URL + "/script.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = process.env.PUBLIC_URL + "/sidebar.js";
    script2.async = true;
    document.body.appendChild(script2);

    const script3 = document.createElement("script");
    script3.src = process.env.PUBLIC_URL + "/scroll.js";
    script3.async = true;
    document.body.appendChild(script3);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
      document.body.removeChild(script3);
    };
  }, []);

  return (
    <>
      <section className="about-values">
        <div className="about-values-container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <img src={process.env.PUBLIC_URL + "/images/value-excellence.png"} alt="Excellence" className="value-icon" />
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
