interface WorkspaceCardProps {
  id: string;
  name: string;
  instanceNumber: number;
  icon: string;
  onClick: (id: string) => void;
}

export const WorkspaceCard = ({
  id,
  name,
  instanceNumber,
  icon,
  onClick,
}: WorkspaceCardProps) => {
  return (
    <button
      onClick={() => onClick(id)}
      className="flex flex-col items-center gap-2 p-2 group"
    >
      <div className="relative">
        {/* Icon container */}
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center overflow-hidden">
          <span className="text-5xl">{icon}</span>
        </div>
        
        {/* Red triangular badge */}
        <div className="absolute bottom-0 right-0 w-0 h-0 
          border-l-[28px] border-l-transparent
          border-b-[28px] border-b-destructive">
          <span className="absolute -bottom-[22px] -left-[18px] text-[10px] font-bold text-white">
            {instanceNumber}
          </span>
        </div>
      </div>
      
      {/* Label */}
      <span className="text-sm text-foreground font-normal">
        {name}
      </span>
    </button>
  );
};
