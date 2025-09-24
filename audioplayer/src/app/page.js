"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./home/page.js";

export default function Pages() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Home />
      </main>
    </QueryClientProvider>
  );
}
