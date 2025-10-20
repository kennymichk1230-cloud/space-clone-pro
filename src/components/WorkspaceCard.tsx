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
    <div className="flex flex-col items-center gap-2 p-2 group relative">
      <button
        onClick={() => onClick(id)}
        className="relative"
      >
        {/* Icon container */}
        <div className="w-20 h-20 bg-card rounded-2xl flex items-center justify-center overflow-hidden shadow-card border border-border transition-all hover:shadow-lg">
          <img 
            src={icon} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Blue triangular badge */}
        <div className="absolute bottom-0 right-0 w-0 h-0 
          border-l-[28px] border-l-transparent
          border-b-[28px] border-b-primary">
          <span className="absolute -bottom-[22px] -left-[18px] text-[10px] font-bold text-white">
            {instanceNumber}
          </span>
        </div>
      </button>
      
      {/* Action buttons */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(id);
          }}
          className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
          title="Edit name"
        >
          <Pencil className="w-3.5 h-3.5 text-primary" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="p-1.5 rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-colors"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5 text-destructive" />
        </button>
      </div>
      
      {/* Label */}
      <span className="text-sm text-foreground font-medium text-center">
        {name}
      </span>
    </div>
  );
};
