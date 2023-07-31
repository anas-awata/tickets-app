import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function LoggedIn({ children }) {
  const token = useSelector((state) => state.token);
  if (token) {
    return <Navigate to="/" />;
  }
  return children;
}

export default LoggedIn;
