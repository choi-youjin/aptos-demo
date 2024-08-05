import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App";
// Internal components
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WalletProvider } from "@/components/WalletProvider";
import ModalProvider from "./hooks/useModal/ModalProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WalletProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
        <TooltipProvider delayDuration={100}>
          <App />
          <Toaster />
        </TooltipProvider>
        </ModalProvider>
      </QueryClientProvider>
    </WalletProvider>
  </React.StrictMode>,
);

// content: ["./frontend/**/*.{ts,tsx}"],