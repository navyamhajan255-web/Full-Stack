import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === "" || password === "" || role === "") {
      alert("Please enter username, password and select a role");
      return;
    }

    if (password !== "1234") {
      alert("Invalid password");
      return;
    }

    // JWT Payload
    const payload = {
      username: username,
      role: role
    };

    // JWT Header
    const header = {
      alg: "HS256",
      typ: "JWT"
    };

    // Mock JWT Token
    const token =
      btoa(JSON.stringify(header)) +
      "." +
      btoa(JSON.stringify(payload)) +
      ".mock-signature";

    // Store authentication information
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    alert("Login Successful");

    onLogin();
  };

  return (
    <div className="container">
      <div className="card">

        <h1 className="title">
          JWT Authentication System
        </h1>

        <h2 className="subtitle">
          Secure Login
        </h2>

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

        <div className="show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </div>

        <h3 className="role-heading">
          Select Role
        </h3>

        <div className="role-options">

          <label>
            <input
              type="radio"
              name="role"
              value="Admin"
              checked={role === "Admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            Admin
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="Editor"
              checked={role === "Editor"}
              onChange={(e) => setRole(e.target.value)}
            />
            Editor
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="Viewer"
              checked={role === "Viewer"}
              onChange={(e) => setRole(e.target.value)}
            />
            Viewer
          </label>

        </div>

        <button onClick={handleLogin}>
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;