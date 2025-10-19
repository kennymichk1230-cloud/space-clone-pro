import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreateWorkspaceButtonProps {
  onClick: () => void;
}

export const CreateWorkspaceButton = ({ onClick }: CreateWorkspaceButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-glow hover:shadow-glow hover:scale-110 transition-all duration-300"
    >
      <Plus className="w-8 h-8" />
    </Button>
  );
};
