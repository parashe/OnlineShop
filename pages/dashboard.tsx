import Layout from "@/components/Layout/Layout";
import { useAuth } from "context/AuthContext";
import React, { useEffect } from "react";
import withAuth from "utils/withAuth";
import Cookies from "js-cookie";
import Dashboard from "@/components/Window/dashboard";
const DashboardPage = () => {
  const { isAuthenticated, userRole, setIsAuthenticated, setUserRole } =
    useAuth();

  console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      // Verify token expiration
      const isTokenExpired = isExpiredToken(token);
      if (!isTokenExpired) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUserRole("");
        // If the token is expired, remove it from cookies
        Cookies.remove("accessToken");
      }
    } else {
      setIsAuthenticated(false);
      setUserRole("");
    }
  }, []);
  const isExpiredToken = (token: string): boolean => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      return expirationTime < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};
export default withAuth(DashboardPage, ["admin"]);
