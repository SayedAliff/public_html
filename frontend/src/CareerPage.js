import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import "./css/sidebar.css";
import "./css/scroll.css";

const CareerPage = () => {
  useEffect(() => {
    // Load legacy JS for sidebar, scroll, etc. (migration phase)
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
      <div className="neon-bg" aria-hidden="true"></div>
      <header>
        <nav className="navbar">
          <Link to="/" className="logo">
            <img src={process.env.PUBLIC_URL + "/images/Meta.png"} alt="Qubit Cloud Logo" height="50" />
          </Link>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/academy">Academy</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/career" className="active">Career</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><a href="/employee_login.php">Employee Portal</a></li>
          </ul>
          <Link to="/contact" className="cta">Schedule a Call</Link>
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
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/academy">Academy</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/career" className="active">Career</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><a href="/employee_login.php">Employee Portal</a></li>
            </ul>
          </nav>
        </aside>
      </header>
      <main>
        <section className="academy-section" style={{ marginBottom: 0 }}>
          <h1>Career Opportunities at Qubit Cloud</h1>
          <p>
            We are offering <strong>Job</strong> and <strong>Internship</strong> opportunities across all our service domains. <br />
            Join our passionate team and build your career in tech!
          </p>
          <div className="academy-features">
            <div className="academy-card">
              <h3>We are hiring for the Job:</h3>
              <ul>
                <li>Web Developer (WordPress/Shopify)</li>
                <li>Laravel Developer</li>
                <li>React Developer</li>
                <li>Python Developer</li>
                <li>Domain & Hosting Specialist</li>
                <li>Database Manager</li>
                <li>UX Designer</li>
                <li>Software Designer</li>
                <li>Software Quality & Testing Engineer</li>
                <li>Digital Marketing Specialist (SEO, SMM, Content, Ads, Email)</li>
                <li>Analytics & Reporting Analyst</li>
                <li>Cloud & DevOps Engineer (AWS & Cloud)</li>
                <li>JavaScript Developer</li>
                <li>Java Developer</li>
                <li>C#/.NET Developer</li>
                <li>PHP Developer</li>
                <li>Golang Developer</li>
                <li>Flutter Developer</li>
                <li>API/Backend Developer</li>
                <li>DevOps Engineer</li>
              </ul>
            </div>
            <div className="academy-card">
              <h3>We are hiring for the Internship:</h3>
              <ul>
                <li>Web Development Intern (WordPress/Shopify)</li>
                <li>Laravel Development Intern</li>
                <li>React/Python Development Intern</li>
                <li>Domain & Hosting Intern</li>
                <li>Database Intern</li>
                <li>UX Design Intern</li>
                <li>Software Design Intern</li>
                <li>Software Testing Intern</li>
                <li>Digital Marketing Intern (SEO, SMM, Content, Ads, Email)</li>
                <li>Analytics & Reporting Intern</li>
                <li>Cloud & DevOps Intern</li>
                <li>JavaScript/Java/C#/.NET/PHP/Golang/Flutter Intern</li>
                <li>API/Backend Intern</li>
                <li>DevOps Intern</li>
              </ul>
            </div>
          </div>
          <div className="academy-cta">
            <p>Ready to apply for a job or internship? Submit your application below:</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdXL8Ce_UtPBnDiIg2I6XXTLa1GahBodQ4bLCQAOeZPiIb42g/viewform?usp=sharing&ouid=103477763079273660801" className="button primary" target="_blank" rel="noopener noreferrer">
              Apply via Google Form
            </a>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-container">
          <div className="footer-left">
            <div className="logo">
              <Link to="/">
                <img src={process.env.PUBLIC_URL + "/images/Meta.png"} alt="Qubit Cloud Logo" height="50" />
                <span>Qubit Cloud</span>
              </Link>
            </div>
            <p>
              Address: Kuril <br />
              Email : <a href="mailto:qubitcld@gmail.com">qubitcld@gmail.com</a><br />
              <br />
              Phone : <a href="tel:+8801577349947">+8801577349947</a>
            </p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About us</Link></li>
                <li><Link to="/career">Career</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/academy">Academy</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/career">Career</Link></li>
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

export default CareerPage;
