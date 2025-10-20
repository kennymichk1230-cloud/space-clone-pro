import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const FacebookApp = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-[#1877F2] text-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate("/")} className="p-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Facebook - Workspace {workspaceId?.slice(0, 8)}</h1>
      </header>

      {/* Embedded Real Facebook */}
      <iframe
        src="https://www.facebook.com"
        className="flex-1 w-full border-0"
        title="Facebook"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
};

export default FacebookApp;
