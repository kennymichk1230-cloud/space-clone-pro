import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const WhatsAppApp = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="p-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold">WhatsApp - Workspace {workspaceId?.slice(0, 8)}</h1>
      </header>

      {/* Embedded Real WhatsApp Web */}
      <iframe
        src="https://web.whatsapp.com"
        className="flex-1 w-full border-0"
        title="WhatsApp"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
};

export default WhatsAppApp;
