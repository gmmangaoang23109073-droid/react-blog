import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { useState } from "react";

import SplashPage from "./pages/SplashPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/RegisterPage";

function Layout() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <>
      {location.pathname !== "/" && (
        <header className="header">
          <h1 className="site-title">The Chic Journal</h1>

          <nav className="nav-bar">
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/register">Register</Link></li>

              <li className="dark-toggle">
                <button onClick={toggleDarkMode} className="dark-btn">
                  🌙
                </button>
              </li>
            </ul>
          </nav>
        </header>
      )}

      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {location.pathname !== "/" && (
        <footer className="footer">
          <p>Contact: urblinkPranpriya@gmail.com</p>
          <p>&copy; 2026 Pranpriya Manoban. Personal Website. All rights reserved.</p>
        </footer>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;