import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (username === "" || password === "") {
      alert("Please enter Username and Password");
      return;
    }

   if (username.trim() !== "" && password === "1234") {
      setLoading(true);

      setTimeout(() => {
        // Mock JWT Token
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.payload";

        // Store Token
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);

        setLoading(false);
        alert("Login Successful");
        onLogin();
      }, 1000);
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">JWT Authentication System</h1>

        <h3 className="subtitle">Login Page</h3>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div style={{ textAlign: "left", marginTop: "5px" }}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            style={{ width: "15px" }}
          />{" "}
          Show Password
        </div>

        <button onClick={handleLogin}>
          {loading ? "Logging In..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;