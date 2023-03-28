import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Outlet } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios.get("/api/v1/auth/check-auth", {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("authToken"))?.token,
        },
      });
      console.log(res);
      if (res.data.success) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    checkAuth();
  }, []);

  return ok ? <Outlet /> : children;
};

export default PrivateRoute;
