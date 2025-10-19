import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Users, Bell, Menu, ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const FacebookApp = () => {
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
      <header className="bg-[#1877F2] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="p-1">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">facebook</h1>
        </div>
        <div className="flex gap-4">
          <Home className="w-6 h-6" />
          <Users className="w-6 h-6" />
          <Bell className="w-6 h-6" />
          <Menu className="w-6 h-6" />
        </div>
      </header>

      {/* Content */}
      <main className="pb-16">
        {/* Create Post */}
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted"></div>
            <input
              type="text"
              placeholder="What's on your mind?"
              className="flex-1 bg-secondary rounded-full px-4 py-2 text-foreground"
              onClick={() => toast.success("Post creation coming soon!")}
            />
          </div>
        </div>

        {/* Feed */}
        <div className="divide-y divide-border">
          {[1, 2, 3].map((post) => (
            <div key={post} className="bg-card p-4">
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-muted"></div>
                <div>
                  <p className="font-semibold text-foreground">User {post}</p>
                  <p className="text-xs text-muted-foreground">2h ago</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-foreground mb-3">
                This is a sample post in workspace {workspaceId}. Each workspace is completely isolated!
              </p>

              {/* Post Image */}
              <div className="bg-muted h-64 rounded-lg mb-3"></div>

              {/* Post Actions */}
              <div className="flex items-center gap-6 pt-2 border-t border-border">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 ${liked ? "text-[#1877F2]" : "text-muted-foreground"}`}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span>Like</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground">
                  <MessageCircle className="w-5 h-5" />
                  <span>Comment</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FacebookApp;
