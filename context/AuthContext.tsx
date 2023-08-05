// context/AuthContext.tsx
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

type AuthContextValue = {
  isAuthenticated: boolean;
  userRole: string;
  login: (role: string) => void;
  logout: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserRole: (userRole: string) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

const isExpiredToken = (token: string): boolean => {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    return expirationTime < currentTime;
  } catch (error) {
    return true;
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const userRoles = Cookies.get("userRole");
    if (token) {
      const isTokenExpired = isExpiredToken(token);
      if (!isTokenExpired) {
        setIsAuthenticated(true);

        setUserRole(userRoles ? userRoles : "");
      } else {
        setIsAuthenticated(false);
        setUserRole("");
        Cookies.remove("accessToken");
      }
    } else {
      setIsAuthenticated(false);
      setUserRole("");
    }
    setIsLoading(false); // Mark the loading process as complete
  }, []);

  const login = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole("");
    Cookies.remove("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        login,
        logout,
        setIsAuthenticated,
        setUserRole,
      }}
    >
      {!isLoading && children} {/* Render children once loading is complete */}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
