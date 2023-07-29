import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
//component to prevent Access without login

function RequireAuth({ children }) {
  const token = useSelector((state) => state.token);
  console.log("required", token);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default RequireAuth;
