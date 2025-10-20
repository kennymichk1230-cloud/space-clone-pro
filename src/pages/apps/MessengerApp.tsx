import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MessengerApp = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#00B2FF] to-[#006AFF] text-white px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="p-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold">Messenger - Workspace {workspaceId?.slice(0, 8)}</h1>
      </header>

      {/* Embedded Real Messenger */}
      <iframe
        src="https://www.messenger.com"
        className="flex-1 w-full border-0"
        title="Messenger"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
};

export default MessengerApp;
