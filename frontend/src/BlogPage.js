import React, { useEffect } from "react";
import "../public/style.css";
import "../public/sidebar.css";
import "../public/scroll.css";

const BlogPage = () => {
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

    // Blog card hover effect
    const blogScript = document.createElement("script");
    blogScript.innerHTML = `
      document.addEventListener('DOMContentLoaded', function () {
        var card = document.querySelector('.sub-company-card');
        if (card) {
          card.addEventListener('mouseenter', function () {
            card.style.transform = 'scale(1.04)';
            card.style.boxShadow = '0 12px 36px rgba(49,47,255,0.16)';
          });
          card.addEventListener('mouseleave', function () {
            card.style.transform = '';
            card.style.boxShadow = '';
          });
        }
      });
    `;
    document.body.appendChild(blogScript);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
      document.body.removeChild(script3);
      document.body.removeChild(blogScript);
    };
  }, []);

  return (
    <>
      <div className="neon-bg" aria-hidden="true"></div>
      {/* Header/Navbar should be a shared component */}
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
      {/* Footer should be a shared component */}
    </>
  );
};

export default BlogPage;
