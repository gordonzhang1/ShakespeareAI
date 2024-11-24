import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../server/authcontext";
import { Link, useNavigate } from "react-router-dom";
import App from "./App";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/");
    } catch {
      setError("failed to log out");
    }
  }
  return (
    <>
      <div>
        <App />
      </div>
    </>
  );
}
