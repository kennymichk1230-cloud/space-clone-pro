import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import FacebookApp from "./pages/apps/FacebookApp";
import WhatsAppApp from "./pages/apps/WhatsAppApp";
import InstagramApp from "./pages/apps/InstagramApp";
import MessengerApp from "./pages/apps/MessengerApp";
import TwitterApp from "./pages/apps/TwitterApp";
import TikTokApp from "./pages/apps/TikTokApp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Index />} />
            <Route path="/app/facebook/:workspaceId" element={<FacebookApp />} />
            <Route path="/app/whatsapp/:workspaceId" element={<WhatsAppApp />} />
            <Route path="/app/instagram/:workspaceId" element={<InstagramApp />} />
            <Route path="/app/messenger/:workspaceId" element={<MessengerApp />} />
            <Route path="/app/twitter/:workspaceId" element={<TwitterApp />} />
            <Route path="/app/tiktok/:workspaceId" element={<TikTokApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
