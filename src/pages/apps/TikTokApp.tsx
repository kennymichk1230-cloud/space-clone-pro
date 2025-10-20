import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TikTokApp = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate("/")} className="p-1">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">TikTok - Workspace {workspaceId?.slice(0, 8)}</h1>
      </header>

      {/* Embedded Real TikTok */}
      <iframe
        src="https://www.tiktok.com"
        className="flex-1 w-full border-0"
        title="TikTok"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
};

export default TikTokApp;
