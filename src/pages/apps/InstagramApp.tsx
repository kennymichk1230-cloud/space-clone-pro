import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const InstagramApp = () => {
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
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent">
          Instagram
        </h1>
        <div className="w-6"></div>
      </header>

      {/* Feed */}
      <main>
        {[1, 2].map((post) => (
          <div key={post} className="border-b border-border">
            {/* Post Header */}
            <div className="flex items-center gap-3 p-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] p-0.5">
                <div className="w-full h-full rounded-full bg-card"></div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">user{post}</p>
                <p className="text-xs text-muted-foreground">Workspace {workspaceId}</p>
              </div>
            </div>

            {/* Post Image */}
            <div className="bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] h-96"></div>

            {/* Post Actions */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-4">
                  <button onClick={handleLike}>
                    <Heart
                      className={`w-7 h-7 ${liked ? "fill-red-500 text-red-500" : "text-foreground"}`}
                    />
                  </button>
                  <MessageCircle className="w-7 h-7 text-foreground" />
                  <Send className="w-7 h-7 text-foreground" />
                </div>
                <Bookmark className="w-7 h-7 text-foreground" />
              </div>

              <p className="font-semibold text-foreground mb-1">1,234 likes</p>
              <p className="text-foreground">
                <span className="font-semibold">user{post}</span> Check out this amazing post in my isolated workspace! 
                #multispace #workspace{post}
              </p>
              <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default InstagramApp;
