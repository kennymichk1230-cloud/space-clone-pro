import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const InstagramApp = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate("/")} className="p-1">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent">
          Instagram - Workspace {workspaceId?.slice(0, 8)}
        </h1>
      </header>

      {/* Embedded Real Instagram */}
      <iframe
        src="https://www.instagram.com"
        className="flex-1 w-full border-0"
        title="Instagram"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
};

export default InstagramApp;
