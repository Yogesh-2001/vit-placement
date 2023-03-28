import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios.get("/api/v1/auth/admin-auth", {
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

  return ok ? children : <Spinner />;
};

export default AdminRoute;
