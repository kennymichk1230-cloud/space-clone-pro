import { Plus } from "lucide-react";

interface CreateWorkspaceButtonProps {
  onClick: () => void;
}

export const CreateWorkspaceButton = ({ onClick }: CreateWorkspaceButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-fab transition-all duration-200 hover:scale-105 flex items-center justify-center"
      aria-label="Create new workspace"
    >
      <Plus className="w-8 h-8 text-primary-foreground" strokeWidth={2.5} />
    </button>
  );
};
