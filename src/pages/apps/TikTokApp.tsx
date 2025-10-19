import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TikTokApp = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? "Unliked" : "Liked!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate("/")} className="p-1">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">TikTok</h1>
        <div className="w-6"></div>
      </header>

      {/* Video Feed */}
      <main className="relative">
        {[1, 2].map((video) => (
          <div key={video} className="relative h-[calc(100vh-60px)] bg-gradient-to-br from-[#00F2EA] to-[#FF0050]">
            {/* Video placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-lg font-semibold">Video {video}</p>
            </div>

            {/* Right sidebar */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-6">
              <button className="flex flex-col items-center" onClick={handleLike}>
                <Heart
                  className={`w-8 h-8 mb-1 ${liked ? "fill-red-500 text-red-500" : "text-white"}`}
                />
                <span className="text-white text-xs">{liked ? "1.2M" : "1.2M"}</span>
              </button>

              <button className="flex flex-col items-center">
                <MessageCircle className="w-8 h-8 text-white mb-1" />
                <span className="text-white text-xs">8.2K</span>
              </button>

              <button className="flex flex-col items-center">
                <Bookmark className="w-8 h-8 text-white mb-1" />
                <span className="text-white text-xs">12K</span>
              </button>

              <button className="flex flex-col items-center">
                <Share2 className="w-8 h-8 text-white mb-1" />
                <span className="text-white text-xs">Share</span>
              </button>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-4 left-4 right-20 text-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-white/20"></div>
                <span className="font-semibold">@user{video}</span>
                <button className="text-[#FF0050] font-semibold">Follow</button>
              </div>
              <p className="text-sm mb-2">
                Amazing content in workspace {workspaceId}! 🔥 #foryou #viral
              </p>
              <p className="text-xs opacity-75">♪ Original Sound - user{video}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default TikTokApp;
