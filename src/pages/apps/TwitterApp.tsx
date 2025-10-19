import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TwitterApp = () => {
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
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => navigate("/")} className="p-1">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Timeline</h1>
      </header>

      {/* Tweet Composer */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-muted"></div>
          <input
            type="text"
            placeholder="What's happening?"
            className="flex-1 bg-background border-none outline-none text-foreground text-lg"
            onClick={() => toast.success("Tweet composer coming soon!")}
          />
        </div>
      </div>

      {/* Feed */}
      <main>
        {[1, 2, 3].map((tweet) => (
          <div key={tweet} className="border-b border-border p-4 hover:bg-muted/50 transition-colors">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-foreground">User {tweet}</span>
                  <span className="text-muted-foreground">@user{tweet}</span>
                  <span className="text-muted-foreground">· 2h</span>
                </div>
                <p className="text-foreground mb-3">
                  This is a sample tweet in workspace {workspaceId}. Each workspace runs independently! 🚀
                </p>
                <div className="flex justify-between max-w-md">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-[#1DA1F2] transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">12</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-[#17BF63] transition-colors">
                    <Repeat2 className="w-5 h-5" />
                    <span className="text-sm">5</span>
                  </button>
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 transition-colors ${
                      liked ? "text-[#F91880]" : "text-muted-foreground hover:text-[#F91880]"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                    <span className="text-sm">{liked ? 101 : 100}</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-[#1DA1F2] transition-colors">
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default TwitterApp;
