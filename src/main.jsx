import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import Login from "./components/Login";
import Index from "./Index";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Index />
  </StrictMode>
);
