// frontend/src/App.js
import { BrowserRouter, Routes, Route, useLocation, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

import SplashPage from "./pages/SplashPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";
import CreatePostPage from "./pages/CreatePostPage";
import AdminPage from "./pages/AdminPage";

function Layout() {
  const location = useLocation();
  const { user, logout } = useAuth(); // Add logout here
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleLogout = () => {
    logout();
    // Navigate to login after logout
    window.location.href = '/login';
  };

  const hideHeaderFooter =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className={darkMode ? "dark" : ""}>
      {!hideHeaderFooter && (
        <header className="header">
          <h1 className="site-title">The Chic Journal</h1>
          <nav className="nav-bar">
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              
              {user ? (
                // Show these when user is logged in
                <>
                  <li><Link to="/profile">Profile</Link></li>
                  {user.role === 'admin' && (
                    <li><Link to="/admin">Admin</Link></li>
                  )}
                  <li><Link to="/create-post">Write Post</Link></li>
                  <li className="user-info">
                    <span className="user-greeting">Hi, {user.name}!</span>
                    <button onClick={handleLogout} className="logout-btn-nav">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                // Show these when no user is logged in
                <>
                  <li><Link to="/register">Register</Link></li>
                  <li><Link to="/login">Login</Link></li>
                </>
              )}
              
              <li>
                <button onClick={toggleDarkMode} className="dark-btn">
                  {darkMode ? "☀️" : "🌙"}
                </button>
              </li>
            </ul>
          </nav>
        </header>
      )}

      <main style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={user ? <Navigate to="/home" /> : <LoginPage />} />
          <Route path="/register" element={user ? <Navigate to="/home" /> : <RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/edit-post/:id" element={user ? <EditPostPage /> : <Navigate to="/login" />} />
          <Route path="/create-post" element={user ? <CreatePostPage /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user?.role === 'admin' ? <AdminPage /> : <Navigate to="/home" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!hideHeaderFooter && (
        <footer className="footer">
          <p>Contact: urblinkPranpriya@gmail.com</p>
          <p>&copy; 2026 The Chic Journal</p>
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;