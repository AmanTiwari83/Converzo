import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

const ProtectedRoute = ({ children }) => {
  const [, navigate] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // While checking auth, don't render anything
  if (isAuthenticated === null) return null;

  return children;
};

export default ProtectedRoute;
