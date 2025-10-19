import { useState } from "react";
import { WorkspaceCard } from "@/components/WorkspaceCard";
import { CreateWorkspaceButton } from "@/components/CreateWorkspaceButton";
import { AppSelector, AVAILABLE_APPS, App } from "@/components/AppSelector";
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
import facebookIcon from "@/assets/facebook-icon.png";

interface Workspace {
  id: string;
  name: string;
  instanceNumber: number;
  icon: string;
  baseApp: string;
  appId: string;
}

const Index = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    { id: "1", name: "Lite(5)", instanceNumber: 5, icon: facebookIcon, baseApp: "Lite", appId: "facebook" },
    { id: "2", name: "Lite(13)", instanceNumber: 13, icon: facebookIcon, baseApp: "Lite", appId: "facebook" },
    { id: "3", name: "David", instanceNumber: 1, icon: facebookIcon, baseApp: "David", appId: "facebook" },
    { id: "4", name: "Lite(2)", instanceNumber: 2, icon: facebookIcon, baseApp: "Lite", appId: "facebook" },
    { id: "5", name: "Lite(6)", instanceNumber: 6, icon: facebookIcon, baseApp: "Lite", appId: "facebook" },
    { id: "6", name: "Lite(9)", instanceNumber: 9, icon: facebookIcon, baseApp: "Lite", appId: "facebook" },
    { id: "7", name: "Lite(10)", instanceNumber: 10, icon: facebookIcon, baseApp: "Lite", appId: "facebook" },
    { id: "8", name: "Lite(15)", instanceNumber: 15, icon: facebookIcon, baseApp: "Lite", appId: "facebook" },
    { id: "9", name: "Lite(16)", instanceNumber: 16, icon: facebookIcon, baseApp: "Lite", appId: "facebook" },
    { id: "10", name: "Lite(17)", instanceNumber: 17, icon: facebookIcon, baseApp: "Lite", appId: "facebook" },
    { id: "11", name: "Lite(19)", instanceNumber: 19, icon: facebookIcon, baseApp: "Lite", appId: "facebook" },
    { id: "12", name: "Lite(20)", instanceNumber: 20, icon: facebookIcon, baseApp: "Lite", appId: "facebook" },
    { id: "13", name: "Lite(7)", instanceNumber: 7, icon: facebookIcon, baseApp: "Lite", appId: "facebook" },
    { id: "14", name: "Lite(3)", instanceNumber: 3, icon: facebookIcon, baseApp: "Lite", appId: "facebook" },
    { id: "15", name: "Lite(21)", instanceNumber: 21, icon: facebookIcon, baseApp: "Lite", appId: "facebook" },
    { id: "16", name: "Lite(1)", instanceNumber: 1, icon: facebookIcon, baseApp: "Lite", appId: "facebook" },
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [customName, setCustomName] = useState("");

  const handleSelectApp = (app: App) => {
    setSelectedApp(app);
  };

  const handleCreateWorkspace = () => {
    if (!selectedApp) {
      toast.error("Please select an app to clone");
      return;
    }

    // Find all instances of the selected app
    const appInstances = workspaces.filter(ws => ws.appId === selectedApp.id);
    const maxInstanceNumber = appInstances.reduce(
      (max, ws) => Math.max(max, ws.instanceNumber),
      0
    );

    const newInstanceNumber = maxInstanceNumber + 1;
    const defaultName = customName.trim() || `${selectedApp.displayName}(${newInstanceNumber})`;

    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name: defaultName,
      instanceNumber: newInstanceNumber,
      icon: selectedApp.icon,
      baseApp: selectedApp.displayName,
      appId: selectedApp.id,
    };

    setWorkspaces([...workspaces, newWorkspace]);
    toast.success(`${defaultName} created`);
    setShowCreateDialog(false);
    setSelectedApp(null);
    setCustomName("");
  };

  const handleLaunchWorkspace = (id: string) => {
    const workspace = workspaces.find((ws) => ws.id === id);
    toast.success(`Launching ${workspace?.name}...`, {
      description: "Opening isolated workspace",
    });
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
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Clone App</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <AppSelector 
              selectedAppId={selectedApp?.id || null}
              onSelectApp={handleSelectApp}
            />

            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Custom Name (Optional)
              </Label>
              <Input
                id="name"
                placeholder={selectedApp ? `${selectedApp.displayName}(${workspaces.filter(ws => ws.appId === selectedApp.id).length + 1})` : "Enter custom name"}
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="bg-secondary border-border text-foreground"
                disabled={!selectedApp}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to use default naming
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setShowCreateDialog(false);
                setSelectedApp(null);
                setCustomName("");
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateWorkspace}
              disabled={!selectedApp}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
            >
              Clone
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
