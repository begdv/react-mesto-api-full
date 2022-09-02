import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/signin"/>;
  }

  return children;
};

export default ProtectedRoute;