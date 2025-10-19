import { useState } from "react";
import { WorkspaceCard } from "@/components/WorkspaceCard";
import { CreateWorkspaceButton } from "@/components/CreateWorkspaceButton";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layers } from "lucide-react";

interface Workspace {
  id: string;
  name: string;
  instanceNumber: number;
  icon: string;
  baseApp: string;
}

const appIcons = ["📱", "💬", "📧", "🎮", "📷", "🎵", "🎬", "📝"];

const Index = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: "1",
      name: "Lite(1)",
      instanceNumber: 1,
      icon: "📱",
      baseApp: "Lite",
    },
    {
      id: "2",
      name: "Lite(2)",
      instanceNumber: 2,
      icon: "📱",
      baseApp: "Lite",
    },
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("📱");

  const handleCreateWorkspace = () => {
    if (!newWorkspaceName.trim()) {
      toast.error("Please enter a workspace name");
      return;
    }

    const maxInstanceNumber = workspaces.reduce(
      (max, ws) => Math.max(max, ws.instanceNumber),
      0
    );

    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name: newWorkspaceName,
      instanceNumber: maxInstanceNumber + 1,
      icon: selectedIcon,
      baseApp: newWorkspaceName.split("(")[0],
    };

    setWorkspaces([...workspaces, newWorkspace]);
    toast.success("Workspace created successfully");
    setShowCreateDialog(false);
    setNewWorkspaceName("");
    setSelectedIcon("📱");
  };

  const handleDeleteWorkspace = (id: string) => {
    setWorkspaces(workspaces.filter((ws) => ws.id !== id));
    toast.success("Workspace deleted");
  };

  const handleRenameWorkspace = (id: string, newName: string) => {
    setWorkspaces(
      workspaces.map((ws) => (ws.id === id ? { ...ws, name: newName } : ws))
    );
    toast.success("Workspace renamed");
  };

  const handleLaunchWorkspace = (id: string) => {
    const workspace = workspaces.find((ws) => ws.id === id);
    toast.success(`Launching ${workspace?.name}...`, {
      description: "Opening isolated workspace environment",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Layers className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                MultiSpace Pro
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage multiple workspace instances
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Your Workspaces
            </h2>
            <p className="text-sm text-muted-foreground">
              {workspaces.length} active workspace{workspaces.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {workspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              {...workspace}
              onDelete={handleDeleteWorkspace}
              onRename={handleRenameWorkspace}
              onLaunch={handleLaunchWorkspace}
            />
          ))}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8">
          <CreateWorkspaceButton onClick={() => setShowCreateDialog(true)} />
        </div>
      </main>

      {/* Create Workspace Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Create New Workspace</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Set up a new isolated workspace instance
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Workspace Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Lite(3)"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Choose Icon</Label>
              <div className="grid grid-cols-8 gap-2">
                {appIcons.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setSelectedIcon(icon)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl transition-all ${
                      selectedIcon === icon
                        ? "bg-primary ring-2 ring-primary"
                        : "bg-secondary hover:bg-muted"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowCreateDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateWorkspace}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
