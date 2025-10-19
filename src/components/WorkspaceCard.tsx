import { Trash2, Edit2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface WorkspaceCardProps {
  id: string;
  name: string;
  instanceNumber: number;
  icon: string;
  onDelete: (id: string) => void;
  onRename: (id: string, newName: string) => void;
  onLaunch: (id: string) => void;
}

export const WorkspaceCard = ({
  id,
  name,
  instanceNumber,
  icon,
  onDelete,
  onRename,
  onLaunch,
}: WorkspaceCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleSave = () => {
    if (editedName.trim()) {
      onRename(id, editedName);
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditedName(name);
      setIsEditing(false);
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
      <div className="absolute top-2 right-2 w-6 h-6 bg-destructive rounded-sm flex items-center justify-center">
        <span className="text-xs font-bold text-destructive-foreground">
          {instanceNumber}
        </span>
      </div>

      <CardContent className="p-6 flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>

        {isEditing ? (
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyPress}
            className="text-center h-8 bg-secondary border-primary"
            autoFocus
          />
        ) : (
          <h3 className="font-semibold text-foreground text-center">
            {name}
          </h3>
        )}

        <div className="flex gap-2 w-full">
          <Button
            size="sm"
            variant="secondary"
            className="flex-1 gap-2"
            onClick={() => onLaunch(id)}
          >
            <Play className="w-4 h-4" />
            Launch
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
