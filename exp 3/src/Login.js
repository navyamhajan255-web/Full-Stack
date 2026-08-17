import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Admin");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    // Save login information
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    // Simple JWT-like token for experiment
    const token = btoa(
      JSON.stringify({
        username: username,
        role: role
      })
    );

    localStorage.setItem("token", token);

    onLogin();
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>JWT Authentication System</h1>

        <h2>Secure Login</h2>

        <form onSubmit={handleLogin}>

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

          <label className="password-check">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) =>
                setShowPassword(e.target.checked)
              }
            />

            Show Password
          </label>

          <h3>Select Role</h3>

          <div className="roles">

            <label>
              <input
                type="radio"
                value="Admin"
                checked={role === "Admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              Admin
            </label>

            <label>
              <input
                type="radio"
                value="Editor"
                checked={role === "Editor"}
                onChange={(e) => setRole(e.target.value)}
              />
              Editor
            </label>

            <label>
              <input
                type="radio"
                value="Viewer"
                checked={role === "Viewer"}
                onChange={(e) => setRole(e.target.value)}
              />
              Viewer
            </label>

          </div>

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;