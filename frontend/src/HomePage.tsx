import React, { useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import "./css/sidebar.css";
import "./css/scroll.css";

// Import JS for sidebar/scroll if you refactor them to modules, otherwise see notes below
// import "../public/script.js";
// import "../public/sidebar.js";
// import "../public/scroll.js";

const HomePage: React.FC = () => {
  // External JS removed for React-only compatibility

  return (
    <>
      <div className={styles.hero}>
        {/* Neon background */}
        {/* Responsive, compressed, CDN-ready image for fast load */}
        <img
          src="https://cdn.example.com/images/hero.webp"
          srcSet="https://cdn.example.com/images/hero-small.webp 480w, https://cdn.example.com/images/hero-medium.webp 800w, https://cdn.example.com/images/hero-large.webp 1200w"
          sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
          alt="Hero"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        {/* Preload critical image in public/index.html: <link rel="preload" href="https://cdn.example.com/images/hero.webp" as="image"> */}
        {/* Responsive, compressed, CDN-ready video for fast load */}
        <video
          src="https://cdn.example.com/videos/hero-bg.webm"
          poster="https://cdn.example.com/images/hero-poster.webp"
          preload="auto"
          controls
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
      {/* Example: Code splitting with Suspense */}
      <Suspense fallback={<div>Loading About...</div>}>
        {/* Lazy load AboutPage component */}
        {/* const AboutPage = React.lazy(() => import('./AboutPage')); */}
        {/* <AboutPage /> */}
      </Suspense>
      <div className="neon-bg" aria-hidden="true"></div>
      <header>
        <nav className="navbar">
          <Link to="/" className="logo">
            <img src={process.env.PUBLIC_URL + "/images/Meta.png"} alt="Qubit Cloud Logo" height="40" />
          </Link>
          <ul className="nav-links">
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/academy">Academy</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/career">Career</Link></li>
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
              <li><Link to="/" className="active">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/academy">Academy</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/career">Career</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><a href="/employee_login.php">Employee Portal</a></li>
            </ul>
          </nav>
        </aside>
      </header>
      {/* ...existing code for main content, hero, services, reviews, etc. (convert all body content to JSX as above) ... */}
      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-left">
            <Link to="/" className="logo">
              <img src={process.env.PUBLIC_URL + "/images/Meta.png"} alt="Qubit Cloud Logo" height="40" />
              <span>Qubit Cloud</span>
              <br />
            </Link>
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

export default HomePage;
