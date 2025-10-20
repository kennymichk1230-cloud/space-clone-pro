import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TwitterApp = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => navigate("/")} className="p-1">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Twitter - Workspace {workspaceId?.slice(0, 8)}</h1>
      </header>

      {/* Embedded Real Twitter */}
      <iframe
        src="https://twitter.com"
        className="flex-1 w-full border-0"
        title="Twitter"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
};

export default TwitterApp;
