import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

const VAPID_KEY =
  "BFpOTb6-Qwh1gl3ICBnZYWGIRfXaEuUBGt1T93g_NnLQwCAVykZixuaWMQzxn77T5VdxyxqRvI6FA_CEzNw3Nu8";

export default async function requestPermission() {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.warn("❌ Notification permission not granted.");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
    });

    if (token) {
      console.log("✅ FCM Token:", token);
      return token;
    } else {
      // Handle Incognito or blocked storage
      const isIncognito = navigator.userAgent.includes("Incognito");
      console.warn(
        `⚠️ No FCM token found. ${
          isIncognito
            ? "Possibly due to Incognito mode or blocked permissions."
            : ""
        }`
      );
      return null;
    }
  } catch (error) {
    console.error("⚠️ Error while getting FCM token:", error);
    return null;
  }
}
