// src/pages/NotificationPage.js
import React, { useEffect, useState, useRef } from "react";
import requestPermission from "./requestPermission";
import { messaging } from "./firebase";
import { onMessage } from "firebase/messaging";

export default function NotificationPage() {
  const [token, setToken] = useState(null);
  const tokenRef = useRef(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("✅ Service Worker registered:", registration.scope);
        })
        .catch((error) => {
          console.error("❌ Service Worker registration failed:", error);
        });
    }

    requestPermission().then((fcmToken) => {
      if (fcmToken) {
        tokenRef.current = fcmToken;
        setToken(fcmToken);

        fetch("https://newbackendcode.onrender.com/save-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: fcmToken }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("✅ Token saved to backend:", data);
          })
          .catch((err) => {
            console.error("❌ Failed to save token:", err);
          });
      }
    });

    onMessage(messaging, (payload) => {
      const { title, body } = payload.notification || {};
      console.log("🔔 Foreground message received:", payload);

      if (Notification.permission === "granted" && title && body) {
        navigator.serviceWorker.getRegistration().then(function (reg) {
          if (reg) {
            reg.showNotification(title, {
              body,
              icon: "/logo192.png",
              badge: "/logo192.png",
              vibrate: [200, 100, 200],
              data: {
                url: "https://newfrontendcode.vercel.app/",
              },
            });
          }
        });
      }
    });
  }, []);

  const sendNotification = async () => {
    const tokenToUse = tokenRef.current;
    if (!tokenToUse) {
      alert("❌ No FCM token available.");
      return;
    }

    try {
      const response = await fetch(
        "https://newbackendcode.onrender.com/send-notification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: tokenToUse,
            title: "📣 Hello this from Mobile!",
            body: "✅ Notification from React PWA (Android)",
          }),
        }
      );

      const result = await response.json();
      console.log("✅ Server Response:", result);
    } catch (error) {
      console.error("❌ Failed to send notification:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Poppins" }}>
      <h1>🔥 Firebase Web Push Notifications</h1>
      <p>Test push notifications on mobile (HTTPS only).</p>
      <button
        onClick={sendNotification}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
        disabled={!token}
      >
        📩 Send Test Notification
      </button>
    </div>
  );
}
