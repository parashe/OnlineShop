import type { AppProps } from "next/app";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import "@/styles/global.css";
import { AuthProvider } from "context/AuthContext";

const queryClient = new QueryClient();
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
