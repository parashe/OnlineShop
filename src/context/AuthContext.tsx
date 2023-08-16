import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface AuthProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const AuthContext = createContext<any>(null);

// AuthProvider component to wrap your app with
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated based on access tokens and roles in cookies
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    // Clear authentication status
    setIsAuthenticated(false);

    // Clear cookies
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userID");
    Cookies.remove("phone");
    Cookies.remove("fullName");
    Cookies.remove("email");

    // Redirect to home page after logout
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
