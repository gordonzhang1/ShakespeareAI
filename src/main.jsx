import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import Login from "./components/Login";
import Index from "./Index";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { EmailProvider } from "./components/EmailContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EmailProvider>
      <Index />
    </EmailProvider>
  </StrictMode>
);
