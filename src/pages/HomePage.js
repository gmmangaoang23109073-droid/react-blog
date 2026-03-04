import { Link } from "react-router-dom";
import { useState } from "react";
import profilePic from "../images/me.jpg";

function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <header className="header">
        <h1 className="site-title">The Chic Journal</h1>
        <nav className="nav-bar">
          <ul>
            <li>
              <Link to="/home" className="active">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li className="dark-toggle">
              <button onClick={toggleDarkMode} className="dark-btn">
                🌙
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <h2 className="title">WELCOME TO MY PERSONAL WEB BLOG</h2>
        <p className="name">Hi! I am Glaiza May B. Mangaoang</p>
        <img src={profilePic} className="profile-pic" alt="profile pic" />
        <p className="text">This website is all about my love for fashion.</p>
        <p className="text">Get to know me better!</p>
      </section>

      <section className="previews">
        <h3>Explore More:</h3>

        <div className="preview">
          <h4>About Me</h4>
          <p>Learn about my fashion journey.</p>
          <Link to="/about">Read More</Link>
        </div>

        <div className="preview">
          <h4>Contact</h4>
          <p>Find out how to reach me for collaborations or questions.</p>
          <Link to="/contact">Read More</Link>
        </div>

        <div className="preview">
          <h4>Register</h4>
          <p>Sign up to get updates and stay connected with my blog.</p>
          <Link to="/register">Read More</Link>
        </div>
      </section>

      <section className="highlights">
        <h3>Key Highlights</h3>
        <ul>
          <li>Personal Style and Identity</li>
          <li>Self-Expression</li>
          <li>Inspiration and Influences</li>
          <li>Confidence Through Fashion</li>
          <li>Growth and Exploration</li>
        </ul>
      </section>

      
    </div>
  );
}

export default HomePage;