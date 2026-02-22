import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import "./css/sidebar.css";
import "./css/scroll.css";

const BlogPage = () => {
  // External JS removed for React-only compatibility

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
            <li><Link to="/blog" className="active">Blog</Link></li>
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
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/academy">Academy</Link></li>
              <li><Link to="/blog" className="active">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/career">Career</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><a href="/employee_login.php">Employee Portal</a></li>
            </ul>
          </nav>
        </aside>
      </header>
      <main>
        <section className="blog-section">
          <h1>Qubit Cloud Blog</h1>
          <p>Insights, stories, and resources from our tech experts.</p>
          <div className="blog-list">
            <article className="blog-card">
              <h2>Building Scalable MVPs: Best Practices for Startups</h2>
              <p className="blog-meta">August 2025 • By Qubit Cloud Team</p>
              <p>Learn how to design and launch MVPs that can grow with your business. Explore our proven strategies and common pitfalls to avoid.</p>
              <a href="#" className="button pdf">Read More</a>
            </article>
            <article className="blog-card">
              <h2>Why Team Augmentation Boosts Productivity</h2>
              <p className="blog-meta">July 2025 • By Qubit Cloud Experts</p>
              <p>Discover the advantages of team augmentation and how it empowers companies to scale quickly while maintaining high quality.</p>
              <a href="#" className="button pdf">Read More</a>
            </article>
            <article className="blog-card">
              <h2>Latest Trends in Cloud & DevOps</h2>
              <p className="blog-meta">June 2025 • By Qubit Cloud Academy</p>
              <p>Stay up-to-date with the newest trends in cloud computing and DevOps. Tips for optimizing your infrastructure and workflow.</p>
              <a href="#" className="button pdf">Read More</a>
            </article>
          </div>
        </section>
        <section className="sub-company-section">
          <div className="sub-company-container">
            <h2>Our Sub-Branch Company</h2>
            <div className="sub-company-card">
              <img src={process.env.PUBLIC_URL + "/images/time-and-technology-logo.png"} alt="Time and Technology Logo" className="sub-company-logo" />
              <div className="sub-company-info">
                <div className="sub-company-name">Time and Technology</div>
                <div className="sub-company-desc">
                  Time and Technology is the innovative sub-branch of our mother company, Qubit Cloud. Specializing in digital solutions and emerging technologies, Time and Technology empowers businesses to optimize their operations and embrace the future of IT development.
                </div>
                <a href="https://timeandtechnology.cloud" className="sub-company-btn" target="_blank" rel="noopener noreferrer">Visit Website</a>
              </div>
            </div>
          </div>
        </section>
        <section className="about-collab-section">
          <div className="about-collab-container">
            <h2>Our Projects</h2>
            <div className="collab-card-grid">
              {/* Repeat for each project */}
              <div className="collab-card">
                <img src={process.env.PUBLIC_URL + "/images/collab-pathoklibrary.png"} alt="pathoklibrary.com Logo" className="collab-logo" />
                <div className="collab-name">pathoklibrary.com</div>
                <div className="collab-desc">A digital library platform empowering readers with a vast collection of books and resources online.</div>
                <a href="https://pathoklibrary.com" className="collab-btn" target="_blank" rel="noopener noreferrer">Visit Website</a>
              </div>
              <div className="collab-card">
                <img src={process.env.PUBLIC_URL + "/images/collab-izerox.png"} alt="Izerox.com Logo" className="collab-logo" />
                <div className="collab-name">izorexcore.com</div>
                <div className="collab-desc">Your tech partner for modern enterprise solutions, IT services, and business innovation.</div>
                <a href="https://izorexcore.com" className="collab-btn" target="_blank" rel="noopener noreferrer">Visit Website</a>
              </div>
              <div className="collab-card">
                <img src={process.env.PUBLIC_URL + "/images/collab-fastestmart.png"} alt="Fastestmart.com Logo" className="collab-logo" />
                <div className="collab-name">Fastestmart.com</div>
                <div className="collab-desc">Online shopping made easy and fast—Bangladesh’s trusted e-commerce destination.</div>
                <a href="https://fastestmart.com" className="collab-btn" target="_blank" rel="noopener noreferrer">Visit Website</a>
              </div>
              <div className="collab-card">
                <img src={process.env.PUBLIC_URL + "/images/collab-rongdonuu.png"} alt="Rongdonuu.com Logo" className="collab-logo" />
                <div className="collab-name">Rongdonuu.Shop</div>
                <div className="collab-desc">Creative solutions for online education, art, and culture—where colors meet learning.</div>
                <a href="https://rongdonuu.shop" className="collab-btn" target="_blank" rel="noopener noreferrer">Visit Website</a>
              </div>
              <div className="collab-card">
                <img src={process.env.PUBLIC_URL + "/images/collab-trident360.png"} alt="Trident360.tech Logo" className="collab-logo" />
                <div className="collab-name">Trident360.tech</div>
                <div className="collab-desc">End-to-end technology services for startups and enterprises, from strategy to execution.</div>
                <a href="https://trident360.tech" className="collab-btn" target="_blank" rel="noopener noreferrer">Visit Website</a>
              </div>
              <div className="collab-card">
                <img src={process.env.PUBLIC_URL + "/images/collab-nexestit.png"} alt="Nexestit.com Logo" className="collab-logo" />
                <div className="collab-name">Nexestit.com</div>
                <div className="collab-desc">Next-generation IT solutions for businesses that demand speed, security, and scalability.</div>
                <a href="https://nexestit.com" className="collab-btn" target="_blank" rel="noopener noreferrer">Visit Website</a>
              </div>
              <div className="collab-card">
                <img src={process.env.PUBLIC_URL + "/images/collab-rongdonuu.png"} alt="fastestmartBangladesh.myshopify.com Logo" className="collab-logo" />
                <div className="collab-name">rongdonuu.com</div>
                <div className="collab-desc">Shopify-powered marketplace for quick, secure, and reliable shopping across Bangladesh.</div>
                <a href="https://fastestmartBangladesh.myshopify.com" className="collab-btn" target="_blank" rel="noopener noreferrer">Visit Website</a>
              </div>
              <div className="collab-card">
                <img src={process.env.PUBLIC_URL + "/images/collab-osamapto.png"} alt="osamapto.com Logo" className="collab-logo" />
                <div className="collab-name">osamapto.com</div>
                <div className="collab-desc">A modern platform for creative content, digital publishing, and online community building.</div>
                <a href="https://osamapto.com" className="collab-btn" target="_blank" rel="noopener noreferrer">Visit Website</a>
              </div>
            </div>
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

export default BlogPage;
