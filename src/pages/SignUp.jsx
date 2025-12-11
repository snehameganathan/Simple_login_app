import { useState } from "react";
import axios from "axios";

export default function SignUp({ goToSignIn }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://simpleloginapp-production-6b2d.up.railway.app/signup",
        formData
      );

      if (res.data.success) {
        alert("Signup successful!");
        goToSignIn();
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
        <h1 className="form-title">Sign Up</h1>

        <input
          placeholder="Full Name"
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input-box"
        />

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
          Sign Up
        </button>

        <p className="form-footer">
          Already have an account?{" "}
          <span className="link-red" onClick={goToSignIn}>
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}
