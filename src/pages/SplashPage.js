import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 
import logo from '../images/logo.jpg'; 

function SplashPage() {
  const navigate = useNavigate();
  const [dots, setDots] = useState('...');

  useEffect(() => {
    // Animation for the loading dots
    let dotCount = 0;
    const dotInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      setDots('.'.repeat(dotCount));
    }, 500);

    // Redirect after 3 seconds
    const redirectTimer = setTimeout(() => {
      clearInterval(dotInterval);
      navigate('/home');
    }, 3000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  const styles = {
    splashWrapper: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 9999,
      margin: 0,
      padding: 0
    },
    loaderContainer: { 
      textAlign: "center", 
      color: "white" 
    },
    logoImage: { 
      width: "200px", 
      height: "auto", 
      marginBottom: "20px",
      borderRadius: "20px", // Matching your .profile-pic style
      border: "2px solid #FF1493",
      boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)"
    },
    title: { 
      fontSize: "42px", 
      marginBottom: "20px", 
      fontWeight: "bold",
      fontFamily: "Lucida Handwriting", // Matching your .header .site-title
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"
    },
    spinner: {
      width: "70px",
      height: "70px",
      border: "6px solid rgba(255, 255, 255, 0.3)",
      borderTop: "6px solid white",
      borderRadius: "50%",
      margin: "20px auto"
    },
    loadingText: {
      fontSize: "22px",
      fontFamily: "Comic Sans MS", // Matching your global body font
      color: "white"
    }
  };

  return (
    <div style={styles.splashWrapper} className="splash-bg">
      <div style={styles.loaderContainer}>
        {/* The logo variable must be used in curly braces */}
        <img 
          src={logo} 
          alt="The Chic Journal Logo" 
          style={styles.logoImage} 
          className="logo-float" 
        />
        
        <h1 style={styles.title}>The Chic Journal</h1>
        
        {/* CSS class 'spinner-animate' handles the rotation */}
        <div style={styles.spinner} className="spinner-animate"></div>
        
        <div style={styles.loadingText}>
          Loading<span style={{ display: 'inline-block', width: '30px', textAlign: 'left' }}>{dots}</span>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;