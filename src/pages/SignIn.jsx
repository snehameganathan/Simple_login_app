import { useState } from "react";
import axios from "axios";

export default function SignIn({ goToSignUp, goToDashboard }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signin", formData);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.user.name);
        goToDashboard();
      } else {
        alert(res.data.message);
      }
    } catch {
      alert("Server error!");
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
