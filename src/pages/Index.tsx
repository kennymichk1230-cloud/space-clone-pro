import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { WorkspaceCard } from "@/components/WorkspaceCard";
import { CreateWorkspaceButton } from "@/components/CreateWorkspaceButton";
import { AppSelector, AVAILABLE_APPS, App } from "@/components/AppSelector";
import { toast } from "sonner";
import { Menu, LogOut } from "lucide-react";
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
  instance_number: number;
  icon_url: string;
  app_id: string;
  app_name: string;
}

const Index = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [customName, setCustomName] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchWorkspaces();
    }
  }, [user]);

  const fetchWorkspaces = async () => {
    const { data, error } = await supabase
      .from("workspaces")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Failed to load workspaces");
    } else {
      setWorkspaces(data || []);
    }
  };

  const handleSelectApp = (app: App) => {
    setSelectedApp(app);
  };

  const handleCreateWorkspace = async () => {
    if (!selectedApp || !user) {
      toast.error("Please select an app to clone");
      return;
    }

    const appInstances = workspaces.filter(ws => ws.app_id === selectedApp.id);
    const maxInstanceNumber = appInstances.reduce(
      (max, ws) => Math.max(max, ws.instance_number),
      0
    );

    const newInstanceNumber = maxInstanceNumber + 1;
    const defaultName = customName.trim() || `${selectedApp.displayName}(${newInstanceNumber})`;

    const { error } = await supabase.from("workspaces").insert({
      user_id: user.id,
      name: defaultName,
      instance_number: newInstanceNumber,
      icon_url: selectedApp.icon,
      app_id: selectedApp.id,
      app_name: selectedApp.displayName,
    });

    if (error) {
      toast.error("Failed to create workspace");
    } else {
      toast.success(`${defaultName} created`);
      fetchWorkspaces();
      setShowCreateDialog(false);
      setSelectedApp(null);
      setCustomName("");
    }
  };

  const handleLaunchWorkspace = (id: string) => {
    const workspace = workspaces.find((ws) => ws.id === id);
    if (workspace) {
      navigate(`/app/${workspace.app_id}/${id}`);
    }
  };

  const handleDeleteWorkspace = async (id: string) => {
    const workspace = workspaces.find((ws) => ws.id === id);
    
    const { error } = await supabase
      .from("workspaces")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete workspace");
    } else {
      toast.success(`${workspace?.name} deleted`);
      fetchWorkspaces();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
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
                  onClick={async () => {
                    const { error } = await supabase
                      .from("workspaces")
                      .delete()
                      .eq("user_id", user.id);
                    
                    if (!error) {
                      setWorkspaces([]);
                      toast.success("All workspaces deleted");
                    }
                  }}
                >
                  Delete All
                </button>
              </div>
            </SheetContent>
          </Sheet>

          <h1 className="text-xl font-normal text-foreground">MultiSpace</h1>
        </div>

        <button
          onClick={handleSignOut}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
          title="Sign out"
        >
          <LogOut className="w-5 h-5 text-muted-foreground" />
        </button>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-24">
        {workspaces.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No workspaces yet</p>
            <p className="text-muted-foreground text-sm mt-2">Tap the + button to create your first workspace</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-x-2 gap-y-6">
            {workspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                id={workspace.id}
                name={workspace.name}
                instanceNumber={workspace.instance_number}
                icon={workspace.icon_url}
                onClick={handleLaunchWorkspace}
              />
            ))}
          </div>
        )}
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
                placeholder={selectedApp ? `${selectedApp.displayName}(${workspaces.filter(ws => ws.app_id === selectedApp.id).length + 1})` : "Enter custom name"}
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
