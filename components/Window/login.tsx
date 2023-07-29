import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useAuth } from "context/AuthContext";
import { loginUser } from "resources/resources";
import { Alert, Button, Input, Spinner } from "../Layout/Atom/atom";
import Image from "next/image";

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

// Function to create a delay using Promises

// The LoginPage component
const LoginPage: React.FC = () => {
  // State variables to manage form inputs and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  // State variables for managing alerts
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState(" ");
  const [alertMessage, setAlertMessage] = useState("");

  // State variable to indicate whether the form is currently being saved
  const [isSaving, setIsSaving] = useState(false);

  // Accessing authentication-related context using the useAuth hook
  const { setIsAuthenticated, setUserRole, userRole } = useAuth();

  // State variable to manage the loading state while checking authentication
  const [loading, setLoading] = useState(true);

  // Router instance to handle page routing
  const router = useRouter();

  // Function to handle form submission (login)
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({ email: "", password: "" });

    // Validating form inputs
    if (!email) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required.",
      }));
    }

    if (!password) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
    }

    // If both email and password are provided, attempt login
    if (email && password) {
      setIsSaving(true);

      try {
        await delay(1000); // Simulating a delay for demonstration purposes

        // Call the loginUser function to perform the actual login
        const loginResponse = await loginUser(email, password);
        console.log(loginResponse);

        // If login is successful and tokens are received
        if (loginResponse.accessToken) {
          setIsSaving(false);

          // Extract role and tokens from the response
          const { roles, accessToken, refreshToken } = loginResponse;
          const role = roles[0];

          // Update authentication context
          setIsAuthenticated(true);
          setUserRole(role);

          // Show a success alert
          setIsAlertVisible(true);
          setAlertMessage("Login Successful");
          setAlertType("success");

          // Save tokens and role in cookies with appropriate expiry
          Cookies.set("accessToken", accessToken, { expires: 1 / 24 }); // 1 hour expiry
          Cookies.set("refreshToken", refreshToken, { expires: 7 }); // 7 days expiry
          Cookies.set("userRole", role);
          Cookies.set("isAuthenticated", "true");

          // Redirect the user based on their role
          if (role === "admin") {
            router.push("/dashboard"); // Redirect to the dashboard for admin users
          } else if (role === "user") {
            router.push("/profile"); // Redirect to the profile page for regular users
          }
        }
      } catch (error) {
        // If login fails, show an error alert
        setAlertType("error");
        setIsAlertVisible(true);
        setAlertMessage("Invalid username or password!");
        setIsSaving(false);
      }
    }
  };

  // useEffect hook to check if the user is already authenticated
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const userRole = Cookies.get("userRole");

    if (accessToken) {
      if (userRole === "admin") {
        router.push("/dashboard");
      }
    } else {
      setLoading(false); // Authentication check is done
    }
  }, [router]);

  // If still loading, show a loading indicator
  if (loading) {
    return (
      <>
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-000 bg-opacity-40 z-[100]">
          <Spinner size={16} color="text-light-200" />
        </div>
      </>
    );
  }

  // Function to handle closing the alert
  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full border-2 border-gray-200 bg-white rounded-lg shadow-lg shadow-red-100 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="py-0">
            <a href="#" className="flex justify-center">
              <Image
                style={{
                  height: "80px",
                  width: "80px",
                  objectFit: "contain",
                }}
                className="pt-0"
                src="/images/logo.png"
                width={200}
                height={500}
                alt="logo"
              />
            </a>
          </div>

          <div className="pt-0 px-6 pb-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center">
              <h1 className="text-[18px] justify-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign In To Continue
              </h1>
            </div>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleLogin}
            >
              <div>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  label="Email"
                  placeholder="email"
                  type="email"
                  errorMessage={formErrors.email}
                />
              </div>
              <div>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  errorMessage={formErrors.password}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-500 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>

              <div className="mt-8">
                {isAlertVisible && (
                  <Alert
                    type={alertType}
                    message={alertMessage}
                    onClose={handleAlertClose}
                  />
                )}
              </div>

              <Button className="w-full bg-primary-600 hover:bg-primary-700  text-white text-sm font-medium rounded-sm px-6 py-3 text-center focus:outline-none transition-colors duration-300">
                {isSaving ? (
                  <div className="flex justify-center">
                    <Spinner color="text-gray" size={6} />
                  </div>
                ) : (
                  <span className="text-sm font-semibold tracking-wide text-white">
                    Sign In
                  </span>
                )}
              </Button>
              <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-ui-red hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
