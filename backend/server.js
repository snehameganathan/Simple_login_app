import express from "express";
import fs from "fs";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();

// ✅ Allow frontend (Local + Vercel)
app.use(
  cors({
    origin: [
      "http://localhost:5173",  // local dev
      "https://simple-login-app-three.vercel.app/", // optionally add your Vercel URL
    ],
    methods: ["GET", "POST"],
    credentials: true
  })
);

app.use(express.json());

const SECRET_KEY = "mysecretkey";
let users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

// 👉 Root route (Fix Railway “Cannot GET /”)
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🎉");
});

// ---------------- SIGNUP ----------------
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const exists = users.find((u) => u.email === email);
  if (exists)
    return res.json({ success: false, message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword
  };

  users.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  res.json({ success: true, message: "Signup successful" });
});

// ---------------- SIGNIN ----------------
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.json({ success: false, message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.json({ success: false, message: "Invalid password" });

  const token = jwt.sign(
    { id: user.id, name: user.name },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({
    success: true,
    token,
    user: { name: user.name, email: user.email }
  });
});

// ---------------- PROTECTED DASHBOARD ----------------
app.get("/dashboard", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ success: true, message: `Welcome ${decoded.name}!` });
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);
