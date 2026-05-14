import "./index.css";
import "./i18n";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingPage from "./pages/loading";
import { RouterProviderWithRole } from "./routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60_000,
      gcTime: 5 * 60_000,
    },
    mutations: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Suspense fallback={<LoadingPage />}>
      <QueryClientProvider client={queryClient}>
        <RouterProviderWithRole />
      </QueryClientProvider>
    </Suspense>
    <ToastContainer
      position="bottom-right"
      theme="dark"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable={false}
    />
  </>,
);

