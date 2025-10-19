import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Video, MoreVertical, Send, Smile } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const WhatsAppApp = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      toast.success("Message sent!");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 rounded-full bg-white/20"></div>
          <div>
            <h1 className="font-semibold">Chat</h1>
            <p className="text-xs opacity-75">Workspace {workspaceId}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Video className="w-6 h-6" />
          <Phone className="w-6 h-6" />
          <MoreVertical className="w-6 h-6" />
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 p-4 space-y-4 bg-[#ECE5DD] overflow-y-auto">
        <div className="flex justify-start">
          <div className="bg-white p-3 rounded-lg max-w-[70%] shadow">
            <p className="text-sm">Welcome to WhatsApp clone!</p>
            <span className="text-xs text-muted-foreground">10:30 AM</span>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#DCF8C6] p-3 rounded-lg max-w-[70%] shadow">
            <p className="text-sm">This is an isolated workspace instance</p>
            <span className="text-xs text-muted-foreground">10:31 AM</span>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="bg-white p-3 rounded-lg max-w-[70%] shadow">
            <p className="text-sm">Each workspace has its own data!</p>
            <span className="text-xs text-muted-foreground">10:32 AM</span>
          </div>
        </div>
      </main>

      {/* Input */}
      <footer className="bg-card border-t border-border p-3 flex items-center gap-2">
        <button className="p-2">
          <Smile className="w-6 h-6 text-muted-foreground" />
        </button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 bg-secondary border-border"
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          onClick={handleSend}
          className="bg-[#075E54] hover:bg-[#075E54]/90"
        >
          <Send className="w-5 h-5" />
        </Button>
      </footer>
    </div>
  );
};

export default WhatsAppApp;
