import { Pencil, Trash2 } from "lucide-react";

interface WorkspaceCardProps {
  id: string;
  name: string;
  instanceNumber: number;
  icon: string;
  onClick: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const WorkspaceCard = ({
  id,
  name,
  instanceNumber,
  icon,
  onClick,
  onEdit,
  onDelete,
}: WorkspaceCardProps) => {
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
