import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    localStorage.getItem("authToken")
      ? setUser(JSON.parse(localStorage.getItem("authToken")).user)
      : setUser("");
  }, []);
  return user ? <Navigate to={"/dashboard"} /> : children;
};

export default PublicRoute;
