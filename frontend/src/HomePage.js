import React, { useEffect } from "react";
// Import CSS files (these will apply globally)
import "../public/style.css";
import "../public/sidebar.css";
import "../public/scroll.css";

// Import JS for sidebar/scroll if you refactor them to modules, otherwise see notes below
// import "../public/script.js";
// import "../public/sidebar.js";
// import "../public/scroll.js";

const HomePage = () => {
  useEffect(() => {
    // If you want to keep using the original JS, you can dynamically load them here
    // (Not best practice, but works for migration phase)
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
      {/* Neon background */}
      <div className="neon-bg" aria-hidden="true"></div>
      <header>
        <nav className="navbar">
          <a href="index.html" className="logo">
            <img src={process.env.PUBLIC_URL + "/images/Meta.png"} alt="Qubit Cloud Logo" height="40" />
          </a>
          <ul className="nav-links">
            <li><a href="index.html" className="active">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="academy.html">Academy</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="career.html">Career</a></li>
            <li><a href="about.html">About</a></li>
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
              <li><a href="about.html">About</a></li>
              <li><a href="employee_login.php">Employee Portal</a></li>
            </ul>
          </nav>
        </aside>
      </header>
      {/* ...existing code for main content, hero, services, reviews, etc. (convert all body content to JSX as above) ... */}
      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-left">
            <a href="index.html" className="logo">
              <img src={process.env.PUBLIC_URL + "/images/Meta.png"} alt="Qubit Cloud Logo" height="40" />
              <span>Qubit Cloud</span>
              <br />
            </a>
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
                <li><a href="about.html">About us</a></li>
                <li><a href="career.html">Career</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="academy.html">Academy</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="career.html">Career</a></li>
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

export default HomePage;
