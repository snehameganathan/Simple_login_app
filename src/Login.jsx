// src/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      if (res.data.success) navigate("/dashboard");
      else setError(res.data.message);
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4">
      <div className="bg-black bg-opacity-80 p-8 rounded-lg w-full max-w-sm border border-gray-800">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Sign In</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email or phone number"
            className="w-full p-3 mb-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 p-3 rounded text-white font-semibold transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
