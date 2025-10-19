import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Smile } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MessengerApp = () => {
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
      <header className="bg-gradient-to-r from-[#00B2FF] to-[#006AFF] text-white px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="p-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="w-10 h-10 rounded-full bg-white/20"></div>
        <div>
          <h1 className="font-semibold">Chat</h1>
          <p className="text-xs opacity-75">Active now</p>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="flex justify-start">
          <div className="bg-muted p-3 rounded-2xl max-w-[70%]">
            <p className="text-sm text-foreground">Hey! Welcome to Messenger</p>
            <span className="text-xs text-muted-foreground">10:30 AM</span>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-gradient-to-r from-[#00B2FF] to-[#006AFF] p-3 rounded-2xl max-w-[70%]">
            <p className="text-sm text-white">This is workspace {workspaceId}</p>
            <span className="text-xs text-white/75">10:31 AM</span>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="bg-muted p-3 rounded-2xl max-w-[70%]">
            <p className="text-sm text-foreground">Each workspace is completely isolated!</p>
            <span className="text-xs text-muted-foreground">10:32 AM</span>
          </div>
        </div>
      </main>

      {/* Input */}
      <footer className="bg-card border-t border-border p-3 flex items-center gap-2">
        <button className="p-2">
          <Smile className="w-6 h-6 text-[#006AFF]" />
        </button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Aa"
          className="flex-1 bg-secondary border-border rounded-full"
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          onClick={handleSend}
          className="bg-gradient-to-r from-[#00B2FF] to-[#006AFF] rounded-full"
        >
          <Send className="w-5 h-5" />
        </Button>
      </footer>
    </div>
  );
};

export default MessengerApp;
