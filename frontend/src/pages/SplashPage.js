import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SplashPage() {

  const navigate = useNavigate();
  const [dots, setDots] = useState("");

  useEffect(() => {

    let dotCount = 0;

    const dotInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      setDots(".".repeat(dotCount));
    }, 500);

    const timer = setTimeout(() => {
      clearInterval(dotInterval);
      navigate("/login"); // redirect to login page
    }, 3000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };

  }, [navigate]);

  return (

    <div style={styles.body}>

      <div style={styles.container}>

        <img src="../images/logo.jpg" alt="Logo" style={styles.logo} />

        <h1 style={styles.title}>The Chic Journal</h1>

        <div style={styles.spinner}></div>

        <div style={styles.loadingText}>
          Loading<span style={styles.dots}>{dots}</span>
        </div>

      </div>

    </div>

  );
}

const styles = {

  body: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "linear-gradient(135deg, #FA9AC0 0%, #ff6fa5 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  zIndex: 9999
},

  container: {
    textAlign: "center",
    color: "white"
  },

  logo: {
  width: "120px",
  marginBottom: "30px",
  animation: "float 3s ease-in-out infinite"
},

  title: {
    fontSize: "42px",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
  },

  spinner: {
    width: "80px",
    height: "80px",
    border: "8px solid rgba(255,255,255,0.3)",
    borderTop: "8px solid white",
    borderRadius: "50%",
    margin: "30px auto",
    animation: "spin 1s linear infinite"
  },

  loadingText: {
    fontSize: "20px",
    marginTop: "20px",
    color: "rgba(255,255,255,0.9)"
  },

  dots: {
    display: "inline-block",
    width: "30px"
  }

};

export default SplashPage;