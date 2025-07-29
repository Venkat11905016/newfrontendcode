import React, { useEffect, useState, useRef } from "react";
import requestPermission from "./requestPermission";
import { messaging } from "./firebase";
import { onMessage, getToken } from "firebase/messaging";

function App() {
  const [token, setToken] = useState(null);
  const tokenRef = useRef(null);

  useEffect(() => {
    // ✅ STEP 1: Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("✅ Service Worker registered:", registration.scope);
          alert("✅ Service Worker registered");
        })
        .catch((error) => {
          console.error("❌ Service Worker registration failed:", error);
          alert("❌ Service Worker failed: " + error.message);
        });
    } else {
      alert("❌ Service worker not supported");
    }

    requestPermission().then((fcmToken) => {
      if (fcmToken) {
        tokenRef.current = fcmToken; // ✅ instant store
        setToken(fcmToken);

        // fetch("http://localhost:5000/save-token", {
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
        // still sets state for UI
      }
    });

    // ✅ STEP 3: Foreground listener (when app is open)
    onMessage(messaging, (payload) => {
      console.log("🔔 Foreground message received:", payload);
      alert("🔔 Push received!\n" + JSON.stringify(payload));

      const { title, body } = payload.notification || {};

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
      } else {
        alert(`${title} - ${body}`);
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
        // "http://localhost:5000/send-notification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: tokenToUse,
            title: "📣 Hello this  from Mobile!",
            body: "✅ Notification from React PWA (Android)",
          }),
        }
      );

      const result = await response.json();
      console.log("✅ Server Response:", result);
      alert("✅ Notification sent via backend.");
    } catch (error) {
      console.error("❌ Failed to send notification:", error);
      alert("❌ Backend error:\n" + error.message);
    }
  };
  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "Poppins" }}>
      <h1>🔥 Firebase Web Push Notifications (Debuggginb)</h1>
      <p>Use this on your mobile via HTTPS to test push notifications.</p>
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

export default App;
