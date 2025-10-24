import { Pencil, Trash2, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkspaceCardProps {
  id: string;
  name: string;
  instanceNumber: number;
  icon: string;
  appId: string;
  onClick: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const WorkspaceCard = ({
  id,
  name,
  instanceNumber,
  icon,
  appId,
  onClick,
  onEdit,
  onDelete,
}: WorkspaceCardProps) => {
  const { toast } = useToast();

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/app/${appId}/${id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: name,
          text: `Open ${name}`,
          url: url,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Open in browser and use 'Add to Home Screen' to install this workspace as a separate app",
      });
    }
  };
  return (
    <div className="flex flex-col items-center gap-1 p-1 group relative">
      <button
        onClick={() => onClick(id)}
        className="relative"
      >
        {/* Icon container */}
        <div className="w-14 h-14 bg-card rounded-xl flex items-center justify-center overflow-hidden shadow-card border border-border transition-all hover:shadow-lg">
          <img 
            src={icon} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Blue triangular badge */}
        <div className="absolute bottom-0 right-0 w-0 h-0 
          border-l-[20px] border-l-transparent
          border-b-[20px] border-b-primary">
          <span className="absolute -bottom-[16px] -left-[13px] text-[8px] font-bold text-white">
            {instanceNumber}
          </span>
        </div>
      </button>
      
      {/* Action buttons */}
      <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleShare}
          className="p-1 rounded-md bg-accent/10 hover:bg-accent/20 transition-colors"
          title="Add to Home Screen"
        >
          <Share2 className="w-3 h-3 text-accent-foreground" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(id);
          }}
          className="p-1 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
          title="Edit name"
        >
          <Pencil className="w-3 h-3 text-primary" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="p-1 rounded-md bg-destructive/10 hover:bg-destructive/20 transition-colors"
          title="Delete"
        >
          <Trash2 className="w-3 h-3 text-destructive" />
        </button>
      </div>
      
      {/* Label */}
      <span className="text-xs text-foreground font-medium text-center line-clamp-1 max-w-full px-1">
        {name}
      </span>
    </div>
  );
};
