import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { Toaster } from "react-hot-toast";
import "modern-normalize";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
  </StrictMode>
);
