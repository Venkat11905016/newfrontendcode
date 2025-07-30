importScripts(
  "https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js"
);

// ✅ Firebase Config
firebase.initializeApp({
  apiKey: "AIzaSyAmbNpOX3BhEfjBch76Me-b8lmNTFnZ2S8",
  authDomain: "fssai-application.firebaseapp.com",
  projectId: "fssai-application",
  storageBucket: "fssai-application.appspot.com",
  messagingSenderId: "562483124955",
  appId: "1:562483124955:web:0d8db444f7cd66767ecafe",
  measurementId: "G-KM9YMN2H7S",
});

const messaging = firebase.messaging();

// ✅ Handle background notifications
messaging.onBackgroundMessage(function (payload) {
  console.log("🔕 Received background message: ", payload);

  const notificationTitle = payload.notification?.title || "🔔 Notification";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/logo192.png", // ✅ Required for Android to show icon
    badge: "/logo192.png", // Optional: badge icon for status bar
    data: {
      click_action: "https://newfrontendcode.vercel.app/notifications",
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Optional: Handle notification click event (best practice)
self.addEventListener("notificationclick", function (event) {
  const click_action = event.notification?.data?.click_action || "/";
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        for (const client of clientList) {
          if (client.url === click_action && "focus" in client)
            return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(click_action);
      })
  );
});
