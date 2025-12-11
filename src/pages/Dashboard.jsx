export default function Dashboard({ goToSignIn }) {
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    goToSignIn();
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {name}!</h1>

      <button onClick={handleLogout} className="btn-red-small">
        Logout
      </button>

    </div>
  );
}
