import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// Replace this:
import reportWebVitals from "./reportWebVitals";
// With this:
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker to enable PWA features
// serviceWorkerRegistration.register();
serviceWorkerRegistration.register();
// if (process.env.NODE_ENV === "production") {
//   serviceWorkerRegistration.register();
// } else {
//   serviceWorkerRegistration.unregister();
// }
