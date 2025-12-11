import { useState } from "react";
import axios from "axios";

export default function SignIn({ goToSignUp, goToDashboard }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://simpleloginapp-production-6b2d.up.railway.app/signin",
        formData
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.user.name);
        goToDashboard();
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Server error! Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="overlay">
      <form className="form-box" onSubmit={handleSubmit}>
        <h1 className="form-title">Sign In</h1>

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="input-box"
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="input-box"
        />

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="btn-red">
          Sign In
        </button>

        <p className="form-footer">
          New here?{" "}
          <span className="link-red" onClick={goToSignUp}>
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
