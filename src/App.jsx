import { useState, useEffect } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import "./style.css";

export default function App() {
  const [page, setPage] = useState("signin");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setPage("dashboard");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setPage("signin");
  };

  return (
    <div className="app-container">

      {/* Netflix SVG Logo */}
      <img src="/netflix.svg" alt="Netflix Logo" className="netflix-logo" />

      {page === "signup" && <SignUp goToSignIn={() => setPage("signin")} />}
      {page === "signin" && (
        <SignIn
          goToSignUp={() => setPage("signup")}
          goToDashboard={() => setPage("dashboard")}
        />
      )}
      {page === "dashboard" && <Dashboard goToSignIn={handleLogout} />}
    </div>
  );
}
