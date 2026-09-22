import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import WhatWeDo from "./pages/WhatWeDo";
import AboutUs from "./pages/AboutUs"; // Added import for AboutUs
import ConnectCareers from "./pages/ConnectCareers";
import AgenticAIEngineer from "./pages/AgenticAIEngineer";
import NotFound from "./pages/NotFound";

import ScienceImpact from "./pages/ScienceImpact";
import ContactUs from "./pages/ContactUs";

const queryClient = new QueryClient();

// Component to handle scrolling to hash elements when using BrowserRouter
const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure the page has rendered
    } else {
      window.scrollTo(0, 0); // Scroll to top on normal route changes
    }
  }, [location]);

  return null;
};

// Assuming ScrollToHashElement and ScrollToTop are new components or aliases for ScrollToHash
// For the purpose of this edit, we'll define placeholder components if they don't exist.
const ScrollToHashElement = ScrollToHash; // Placeholder, assuming similar functionality
const ScrollToTop = () => { // Placeholder for a component that scrolls to top on route change
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToHashElement />
      <ScrollToTop />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/science-impact" element={<ScienceImpact />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/agentic-ai-engineer" element={<AgenticAIEngineer />} />
          <Route path="/connect-careers" element={<ConnectCareers />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
