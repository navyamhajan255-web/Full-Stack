function Dashboard({ onLogout }) {
  const username = localStorage.getItem("username");

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">JWT Authentication System</h1>

        <h2
          style={{
            color: "#5caeff",
            marginTop: "20px",
            marginBottom: "15px",
          }}
        >
          Welcome {username} 
        </h2>

        <p
          style={{
            color: "#666",
            fontSize: "17px",
            marginBottom: "25px",
          }}
        >
          You have successfully logged in.
        </p>

        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;