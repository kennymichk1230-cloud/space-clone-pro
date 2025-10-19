import { useState } from "react";
import { WorkspaceCard } from "@/components/WorkspaceCard";
import { CreateWorkspaceButton } from "@/components/CreateWorkspaceButton";
import { toast } from "sonner";
import { Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
    { id: "1", name: "Lite(5)", instanceNumber: 5, icon: "📱", baseApp: "Lite" },
    { id: "2", name: "Lite(13)", instanceNumber: 13, icon: "📱", baseApp: "Lite" },
    { id: "3", name: "David", instanceNumber: 1, icon: "📱", baseApp: "David" },
    { id: "4", name: "Lite(2)", instanceNumber: 2, icon: "📱", baseApp: "Lite" },
    { id: "5", name: "Lite(6)", instanceNumber: 6, icon: "📱", baseApp: "Lite" },
    { id: "6", name: "Lite(9)", instanceNumber: 9, icon: "📱", baseApp: "Lite" },
    { id: "7", name: "Lite(10)", instanceNumber: 10, icon: "📱", baseApp: "Lite" },
    { id: "8", name: "Lite(15)", instanceNumber: 15, icon: "📱", baseApp: "Lite" },
    { id: "9", name: "Lite(16)", instanceNumber: 16, icon: "📱", baseApp: "Lite" },
    { id: "10", name: "Lite(17)", instanceNumber: 17, icon: "📱", baseApp: "Lite" },
    { id: "11", name: "Lite(19)", instanceNumber: 19, icon: "📱", baseApp: "Lite" },
    { id: "12", name: "Lite(20)", instanceNumber: 20, icon: "📱", baseApp: "Lite" },
    { id: "13", name: "Lite(7)", instanceNumber: 7, icon: "📱", baseApp: "Lite" },
    { id: "14", name: "Lite(3)", instanceNumber: 3, icon: "📱", baseApp: "Lite" },
    { id: "15", name: "Lite(21)", instanceNumber: 21, icon: "📱", baseApp: "Lite" },
    { id: "16", name: "Lite(1)", instanceNumber: 1, icon: "📱", baseApp: "Lite" },
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
    toast.success(`${newWorkspaceName} created`);
    setShowCreateDialog(false);
    setNewWorkspaceName("");
    setSelectedIcon("📱");
  };

  const handleLaunchWorkspace = (id: string) => {
    const workspace = workspaces.find((ws) => ws.id === id);
    toast.success(`Launching ${workspace?.name}...`);
  };

  const handleDeleteWorkspace = (id: string) => {
    const workspace = workspaces.find((ws) => ws.id === id);
    setWorkspaces(workspaces.filter((ws) => ws.id !== id));
    toast.success(`${workspace?.name} deleted`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-4">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2">
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-card border-border">
            <SheetHeader>
              <SheetTitle className="text-foreground">Menu</SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-4">
              <button className="w-full text-left px-4 py-2 hover:bg-muted rounded-lg text-foreground">
                All Workspaces
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-muted rounded-lg text-foreground">
                Settings
              </button>
              <button 
                className="w-full text-left px-4 py-2 hover:bg-muted rounded-lg text-destructive"
                onClick={() => {
                  setWorkspaces([]);
                  toast.success("All workspaces deleted");
                }}
              >
                Delete All
              </button>
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="text-xl font-normal text-foreground">MultiSpace</h1>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-24">
        <div className="grid grid-cols-3 gap-x-2 gap-y-6">
          {workspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              {...workspace}
              onClick={handleLaunchWorkspace}
            />
          ))}
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
        <CreateWorkspaceButton onClick={() => setShowCreateDialog(true)} />
      </div>

      {/* Create Workspace Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Create New Workspace</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Workspace Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Lite(22)"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                className="bg-secondary border-border text-foreground"
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
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
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
