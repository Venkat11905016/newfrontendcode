import React from "react";

export default function Dashboard() {
  const email = localStorage.getItem("email");

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
        padding: 20,
        backgroundColor: "#f4f6f8",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px 20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          maxWidth: "90%",
          width: "350px",
        }}
      >
        <h1 style={{ marginBottom: 10, color: "#333" }}>👋 Welcome</h1>
        <p style={{ fontSize: "16px", color: "#555" }}>You are logged in as:</p>
        {/* <p style={{ fontWeight: "bold", color: "#4CAF50" }}>{email}</p> */}
      </div>
    </div>
  );
}
