
// ServicesPage.js (React component)
// Migrated from services.html
// All image references use process.env.PUBLIC_URL for React compatibility
// CSS files imported at the top for global styles
// JS files (script.js, sidebar.js, scroll.js) are dynamically loaded in useEffect for compatibility
// The MVP Cost Calculator's script is inlined in useEffect as well
// All class attributes changed to className, and self-closing tags fixed for JSX
// To use: import ServicesPage from './ServicesPage'; and render <ServicesPage /> in App.js or your router

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import "./css/sidebar.css";
import "./css/scroll.css";

const ServicesPage = () => {
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

    // Inline MVP calculator logic
    const mvpHandler = (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      let baseCost = 1000;
      let baseDays = 10;
      switch(data.projectType) {
        case 'mobile': baseCost += 500; baseDays += 5; break;
        case 'api': baseCost += 300; baseDays += 3; break;
        case 'other': baseCost += 200; baseDays += 2; break;
      }
      baseCost += Number(data.features) * 400;
      baseDays += Number(data.features) * 2;
      if(data.designComplexity === 'standard') { baseCost += 500; baseDays += 5; }
      if(data.designComplexity === 'premium') { baseCost += 1000; baseDays += 10; }
      if(data.integration === 'standard') { baseCost += 700; baseDays += 7; }
      if(data.integration === 'complex') { baseCost += 1500; baseDays += 14; }
      baseCost *= Number(data.teamSize) / 2;
      baseDays /= Number(data.teamSize) / 2;
      document.getElementById('mvpResult').innerHTML =
        `<h3>Estimated MVP Cost: $${baseCost.toLocaleString()}</h3>` +
        `<p>Estimated Timeline: ${Math.ceil(baseDays)} working days</p>` +
        `<p><small>This is a rough estimate. Contact us for a precise quote!</small></p>`;
    };
    const form = document.getElementById('mvpForm');
    if (form) form.addEventListener('submit', mvpHandler);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
      document.body.removeChild(script3);
      if (form) form.removeEventListener('submit', mvpHandler);
    };
  }, []);

  return (
    <>
      <header>
        <nav className="navbar">
          <Link to="/" className="logo">
            <img src={process.env.PUBLIC_URL + "/images/Meta.png"} alt="Qubit Cloud Logo" height="50" />
            <span>Qubit Cloud</span>
          </Link>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services" className="active">Services</Link></li>
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
      </header>
      <main>
        <section className="services-section">
          <div className="services-container">
            <div className="services-left">
              <h2>We are providing </h2>
              <ul>
                <li>Web Devlopment <span className="arrow">&rarr;</span></li>
                <li>Software Development <span className="arrow">&rarr;</span></li>
                <li>Full Stack Devlopment <span className="arrow">&rarr;</span></li>
                <li>Digital Marketing <span className="arrow">&rarr;</span></li>
              </ul>
              <div className="cta-box">
                <p>Want to accelerate your software company?</p>
                <Link to="/contact" className="button primary">Hire The Best Team &rarr;</Link>
              </div>
            </div>
            <div className="services-right">
              <div>
                <h2>Technologies</h2>
                <ul>
                  <li>JavaScript</li>
                  <li>Python</li>
                  <li>Java</li>
                  <li>C#</li>
                  <li>.NET</li>
                  <li>PHP</li>
                  <li>Golang</li>
                  <li>Flutter</li>
                  <li>React</li>
                  <li>Node.js</li>
                  <li>AWS & Cloud</li>
                </ul>
              </div>
              <div>
                <h2>For Hiring</h2>
                <ul>
                  <li>Hire Developers</li>
                  <li>JavaScript Developers</li>
                  <li>Python Developers</li>
                  <li>Java Developers</li>
                  <li>Golang Developers</li>
                  <li>.NET Developers</li>
                  <li>React Developers</li>
                  <li>DevOps Engineers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="calculator-section">
          <h1>MVP Cost Calculator</h1>
          <p>Estimate the cost and timeline for your Minimum Viable Product (MVP). Select your options below:</p>
          <form id="mvpForm" className="mvp-form">
            <label>
              Project Type:
              <select name="projectType" required>
                <option value="web">Web Application</option>
                <option value="mobile">Mobile App</option>
                <option value="api">API/Backend</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>
              Number of Features:
              <input type="number" name="features" min="1" max="50" defaultValue="5" required />
            </label>
            <label>
              Design Complexity:
              <select name="designComplexity" required>
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </label>
            <label>
              Integration Needs:
              <select name="integration" required>
                <option value="none">None</option>
                <option value="standard">Standard (Payment, Auth, etc.)</option>
                <option value="complex">Complex (3rd Party APIs, AI, etc.)</option>
              </select>
            </label>
            <label>
              Team Size:
              <select name="teamSize" required>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5+</option>
              </select>
            </label>
            <button type="submit" className="button primary">Calculate Estimate</button>
          </form>
          <div id="mvpResult" className="mvp-result"></div>
        </section>
      </main>
      <footer>
        <div className="footer-container">
          <div className="footer-left">
            <div className="logo">
              <img src={process.env.PUBLIC_URL + "/images/Meta.png"} alt="Qubit Cloud Logo" height="50" />
              <span>Qubit Cloud</span>
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
}

export default ServicesPage;
