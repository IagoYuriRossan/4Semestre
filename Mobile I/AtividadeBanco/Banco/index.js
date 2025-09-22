import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";   // <-- sem chaves e sem .js
// se ainda der erro, testa: import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
