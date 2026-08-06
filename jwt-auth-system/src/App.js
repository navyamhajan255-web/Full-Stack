import { useState, useEffect } from "react";
import "./style.css";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if token exists when app loads
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Called after successful login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    alert("Logged Out Successfully");
  };

  return (
    <>
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;