import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import "./css/sidebar.css";
import "./css/scroll.css";

const ContactPage = () => {
  const formRef = useRef();
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg("");
    const form = formRef.current;
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
    };
    try {
      const res = await fetch("/submit_contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data),
      });
      const result = await res.json();
      if (result.success) {
        setMsg(result.message || "Thank you for reaching out! We'll get back to you soon.");
        form.reset();
      } else {
        setMsg(result.message || "Error submitting contact. Please try again.");
      }
    } catch {
      setMsg("Error submitting contact. Please try again.");
    }
    setSubmitting(false);
  };

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
            <li><Link to="/contact" className="active">Contact</Link></li>
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
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact" className="active">Contact</Link></li>
              <li><Link to="/career">Career</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><a href="/employee_login.php">Employee Portal</a></li>
            </ul>
          </nav>
        </aside>
      </header>
      <main>
        <section className="contact-section">
          <h1>Contact Qubit Cloud</h1>
          <p>Let's connect! Reach out for project inquiries, hiring, partnership, or any questions.</p>
          <div className="contact-details">
            <div>
              <h3>Address</h3>
              <p>Kuril</p>
            </div>
            <div>
              <h3>Email</h3>
              <p><a href="mailto:qubitcld@gmail.com">qubitcld@gmail.com</a></p>
            </div>
            <br />
            <div>
              <h3>Phone</h3>
              <p><a href="tel:+8801577349947">+8801577349947</a></p>
            </div>
          </div>
          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <label>
              Phone Number:
              <input type="tel" name="phone" required />
            </label>
            <label>
              Subject:
              <input type="text" name="subject" required />
            </label>
            <label>
              Message:
              <textarea name="message" rows={5} required />
            </label>
            <button type="submit" className="button primary" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
          <div id="contactMsg" className="contact-msg">{msg}</div>
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

export default ContactPage;
