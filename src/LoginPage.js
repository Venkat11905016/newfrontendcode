import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://newbackendcode.onrender.com";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (isLogin) {
      navigate("/dashboard");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f5f7fa",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px 25px",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          {isLogin ? "🔐 Login" : "📝 Register"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            display: "block",
            marginBottom: 15,
            width: "100%",
            padding: 12,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: "block",
            marginBottom: 15,
            width: "100%",
            padding: 12,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: 6,
            width: "100%",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p style={{ marginTop: 15, textAlign: "center" }}>
          {isLogin ? "New user?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              color: "#2196F3",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

        {message && (
          <p style={{ color: "red", textAlign: "center", marginTop: 10 }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
