import React, { useEffect } from "react";
import "../public/style.css";
import "../public/sidebar.css";
import "../public/scroll.css";

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

    // About page specific JS (icon/cta animation)
    const aboutScript = document.createElement("script");
    aboutScript.innerHTML = `
      document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.value-card').forEach(function(card) {
          card.addEventListener('mouseenter', function () {
            const icon = card.querySelector('.value-icon');
            if (icon) {
              icon.style.transform = 'scale(1.18) rotate(-8deg)';
              icon.style.transition = 'transform .22s cubic-bezier(.4,1,.4,1)';
            }
          });
          card.addEventListener('mouseleave', function () {
            const icon = card.querySelector('.value-icon');
            if (icon) {
              icon.style.transform = 'scale(1) rotate(0deg)';
            }
          });
        });
        const ctaBtn = document.querySelector('.about-cta-container .button.primary');
        if (ctaBtn) {
          ctaBtn.addEventListener('mouseenter', function () {
            ctaBtn.style.transform = 'scale(1.04)';
            ctaBtn.style.boxShadow = '0 8px 26px rgba(49,47,255,0.16)';
          });
          ctaBtn.addEventListener('mouseleave', function () {
            ctaBtn.style.transform = '';
            ctaBtn.style.boxShadow = '';
          });
        }
      });
    `;
    document.body.appendChild(aboutScript);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
      document.body.removeChild(script3);
      document.body.removeChild(aboutScript);
    };
  }, []);

  return (
    <>
      <div className="neon-bg" aria-hidden="true"></div>
      <header>
        <nav className="navbar">
          <a href="index.html" className="logo">
            <img src={process.env.PUBLIC_URL + "/images/Meta.png"} alt="Qubit Cloud Logo" height="48" />
          </a>
          <ul className="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="academy.html">Academy</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="career.html">Career</a></li>
            <li><a href="about.html" className="active">About</a></li>
            <li><a href="employee_login.php">Employee Portal</a></li>
          </ul>
          <a href="contact.html" className="cta">Schedule a Call</a>
          <button className="sidebar-toggle" id="sidebarToggle" aria-label="Open Menu" aria-controls="mobileSidebar" aria-expanded="false">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </nav>
        <div className="sidebar-overlay" id="sidebarOverlay"></div>
        <aside className="mobile-sidebar" id="mobileSidebar" aria-hidden="true">
          <nav>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="academy.html">Academy</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="career.html">Career</a></li>
              <li><a href="about.html" className="active">About</a></li>
              <li><a href="employee_login.php">Employee Portal</a></li>
            </ul>
          </nav>
        </aside>
      </header>
      <main>
        {/* About Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content">
            <h1>About Qubit Cloud</h1>
            <p>Welcome to Qubit Cloud, where technology meets creativity. We are an innovative IT firm dedicated to building smart, modern, and result-driven digital solutions.</p>
            <p>From websites and software development to digital marketing, we provide everything your business needs to grow in the digital world. Our mission is simple — to update and uplift your business through technology and innovation.</p>
            <p>At Qubit Cloud, we don’t just deliver services; we build relationships. We believe that long-term success comes from trust, transparency, and teamwork. Our vision is to create a strong digital bond with every client we serve, helping them reach new heights in their business journey.</p>
            <p>Our passionate team of developers, designers, and marketers work hand in hand to craft solutions that are efficient, secure, and beautifully designed. We focus on quality, creativity, and customer satisfaction above everything else.</p>
            <p>Every project we handle is treated with care and precision because your success is the measure of our success. We turn ideas into reality, challenges into opportunities, and visions into results.</p>
            <p>At Qubit Cloud, we are not just shaping technology; we are shaping the future of your business. Join us on this journey to make your brand smarter, faster, and stronger with innovation you can trust and a team that truly cares.</p>
          </div>
        </section>
        {/* Who We Are Section */}
        <section className="about-section">
          <div className="about-container">
            <div className="about-left">
              <h2>Who We Are</h2>
              <p>Founded by industry experts, Qubit Cloud brings together a diverse team of top talents specializing in web, mobile, cloud, and data solutions. We believe in agile methodologies, transparent communication, and building lasting partnerships.</p>
              <ul className="about-list">
                <li>80+ Top Engineering Talents</li>
                <li>120+ Successful Projects Delivered</li>
                <li>Global Presence in 2 Locations</li>
                <li>Trusted by Startups, SMBs, and Enterprises</li>
              </ul>
            </div>
            <div className="about-right">
              <img src={process.env.PUBLIC_URL + "/images/team-1.jpg"} alt="Qubit Cloud Team" className="about-team-img" />
            </div>
          </div>
        </section>
        {/* Our Values Section */}
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
            <a href="contact.html" className="button primary">Let’s Work Together</a>
          </div>
        </section>
        {/* Journey/Team Section */}
        <section className="journey-section" aria-labelledby="journey-heading">
          <div className="max-w-1200 center journey-inner" style={{padding: "64px 20px"}}>
            <header className="journey-header" style={{textAlign: "center", marginBottom: 36}}>
              <h2 id="journey-heading" className="journey-title">
                Journey With Us,<br />
                Collaborating With Us Is Your Pathway to Success.
              </h2>
            </header>
            <div className="journey-features" aria-hidden="false" style={{display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "space-between", marginBottom: 40}}>
              <div className="feature">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#FFE6F2"/><path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1.5c-3 0-6 1.5-6 4.5v1h12v-1c0-3-3-4.5-6-4.5z" fill="#1f1330"/></svg>
                </div>
                <div className="feature-body">
                  <h3>Professional Developers</h3>
                  <p>We have professional software developers with expertise in 100+ technologies</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#E8FBFF"/><path d="M7 12h10M7 8h10" stroke="#102233" strokeWidth="1.2" strokeLinecap="round"/></svg>
                </div>
                <div className="feature-body">
                  <h3>Dedicated Account Specialists</h3>
                  <p>Tailored solutions for every key account.</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#E9FFE9"/><path d="M9 12l2 2 4-4" stroke="#0b8b4a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="feature-body">
                  <h3>Flexible Strategy</h3>
                  <p>Innovative & flexible strategy suitable for changing requirements</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon" aria-hidden="true">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#F3E6FF"/><path d="M12 7v5l3 2" stroke="#4a2fa8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="feature-body">
                  <h3>On-time Delivery</h3>
                  <p>Delivering ahead of schedule, every time</p>
                </div>
              </div>
            </div>
            <div className="team-row" style={{display: "flex", gap: 22, flexWrap: "wrap", justifyContent: "center", alignItems: "flex-end", marginBottom: 40}}>
              <div className="team-card team-card--blue">
                <div className="card-meta">
                  <div className="card-name">FARDIN AHMED OHE</div>
                  <div className="card-role">CEO</div>
                </div>
                <div className="card-shape">
                  <img src={process.env.PUBLIC_URL + "/images/person-1.jpg"} alt="FARDIN AHMED OHE" />
                </div>
              </div>
              <div className="team-card team-card--lavender">
                <div className="card-meta">
                  <div className="card-name">TAMIM RAHMAN</div>
                  <div className="card-role">HEAD OF HR DEPARTMENT</div>
                </div>
                <div className="card-shape">
                  <img src={process.env.PUBLIC_URL + "/images/person-2.jpg"} alt="FARDIN AHMED OHE" />
                </div>
              </div>
              <div className="team-card team-card--mint">
                <div className="card-meta">
                  <div className="card-name">HABIB RAHMAN</div>
                  <div className="card-role"> EXECUTIVE</div>
                </div>
                <div className="card-shape">
                  <img src={process.env.PUBLIC_URL + "/images/person-3.jpg"} alt="TAREQ SAMRAT" />
                </div>
              </div>
              <div className="team-card team-card--pink">
                <div className="card-meta">
                  <div className="card-name">MD TAREQ JAMIL SARKAR</div>
                  <div className="card-role"> PROJECT MANAGER </div>
                </div>
                <div className="card-shape">
                  <img src={process.env.PUBLIC_URL + "/images/person-4.jpg"} alt="MD TAREQ JAMIL SARKAR" />
                </div>
              </div>
            </div>
            <div style={{textAlign: "center", marginTop: 12}}>
              <h3 className="journey-cta-title" style={{fontSize: "2rem", margin: "20px 0 18px 0"}}>Crafting Your Dream Squad.</h3>
              <a className="button primary hire-cta" href="contact.html" style={{display: "inline-block", padding: "12px 22px", borderRadius: 10}}>Hire The Best Team →</a>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-container">
          <div className="footer-left">
            <a href="index.html" className="logo">
              <img src={process.env.PUBLIC_URL + "/images/Meta.png"} alt="Qubit Cloud Logo" height="48" />
              <span>Qubit Cloud</span>
            </a>
            <p>
              Address: Kuril <br />
              Email: <a href="mailto:metaqubitx@gmail.com">qubitcld@gmail.com</a><br />
              Phone: <a href="tel:+8801577349947">+8801577349947</a>
            </p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="about.html" className="active">About us</a></li>
                <li><a href="career.html">Career</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="academy.html">Academy</a></li>
                <li><a href="privacy.html">Privacy Policy</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4>Collaboration Models</h4>
              <ul>
                <li>Team Augmentation</li>
                <li>Offshore Development</li>
                <li>MVP Service</li>
                <li>End to End Development</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2025 Qubit Cloud. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default AboutPage;
