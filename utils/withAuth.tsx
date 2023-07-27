import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[] = []
) => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const { isAuthenticated, userRole, setIsAuthenticated, setUserRole } =
      useAuth();

    useEffect(() => {
      console.log("allowedRoles", allowedRoles);
      // Redirect to login if the user is not authenticated
      if (!isAuthenticated) {
        router.push("/Login");
        return;
      }

      // Redirect to login if the user's role is not allowed
      if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        router.push("/unauthorized");
        return;
      }
    }, [router, isAuthenticated, userRole, allowedRoles]);

    useEffect(() => {
      const token = Cookies.get("accessToken");
      if (token) {
        // Verify token expiration
        const isTokenExpired = isExpiredToken(token);
        if (!isTokenExpired) {
          setIsAuthenticated(true);
          setUserRole(userRole);
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

    // Render the wrapped component if the user is authenticated and has the allowed role
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
