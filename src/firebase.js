import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAmbNpOX3BhEfjBch76Me-b8lmNTFnZ2S8",
  authDomain: "fssai-application.firebaseapp.com",
  projectId: "fssai-application",
  storageBucket: "fssai-application.appspot.com", // ✅ corrected
  messagingSenderId: "562483124955",
  appId: "1:562483124955:web:0d8db444f7cd66767ecafe",
  measurementId: "G-KM9YMN2H7S",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
