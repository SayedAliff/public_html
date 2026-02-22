

import './css/style.css';
import './css/sidebar.css';
import './css/scroll.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import AboutPage from './AboutPage.tsx';
import ServicesPage from './ServicesPage.tsx';
import BlogPage from './BlogPage.tsx';
import CareerPage from './CareerPage.tsx';
import ContactPage from './ContactPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
