import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../server/authcontext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <Element {...rest} />;
}
