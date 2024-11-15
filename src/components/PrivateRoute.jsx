import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../server/authcontext";

export default function PrivateRoute({ element }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }
  return element;
}
