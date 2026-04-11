import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import {
  Download,
  FolderOpen,
  LogOut,
  Plus,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../hooks/use-auth";
import {
  useCreateCollection,
  useDeleteCollection,
  useMyCollections,
} from "../hooks/use-collections";
import {
  useDownloadHistory,
  useMyProfile,
  useSubscriptionStatus,
  useUpsertUser,
} from "../hooks/use-user";
import { UserTier } from "../types";

export function AccountPage() {
  const { isAuthenticated, isInitializing, login, logout } = useAuth();

  if (isInitializing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4"
        data-ocid="account-signin-gate"
      >
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Your Account
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Sign in to manage your profile, collections, and download history.
          </p>
        </div>
        <Button
          onClick={login}
          size="lg"
          className="gap-2"
          data-ocid="account-signin-btn"
        >
          Sign In with Internet Identity
        </Button>
      </div>
    );
  }

  return <AccountDashboard logout={logout} />;
}

function AccountDashboard({ logout }: { logout: () => void }) {
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: downloads } = useDownloadHistory();
  const { data: subscriptionStatus } = useSubscriptionStatus();
  const upsertUser = useUpsertUser();
  const isPremium =
    profile?.tier === UserTier.premium ||
    subscriptionStatus?.tier === UserTier.premium;

  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState("");

  const handleSaveProfile = async () => {
    if (!editUsername.trim() || !editEmail.trim()) {
      toast.error("Username and email are required.");
      return;
    }
    try {
      await upsertUser.mutateAsync({
        username: editUsername,
        email: editEmail,
      });
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  const startEdit = () => {
    setEditUsername(profile?.username ?? "");
    setEditEmail(profile?.email ?? "");
    setIsEditing(true);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Account header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-display text-xl font-bold text-primary">
                  {profile?.username?.[0]?.toUpperCase() ?? "U"}
                </span>
              </div>
              {profileLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-display text-xl font-bold text-foreground">
                      {profile?.username ?? "New User"}
                    </h1>
                    {isPremium && (
                      <Badge className="bg-accent/15 text-accent border-accent/20 text-[10px] gap-1">
                        <Sparkles className="h-2.5 w-2.5" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {profile?.email}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!isPremium && (
                <div className="flex flex-col items-end gap-1">
                  <Button
                    size="sm"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
                    onClick={() =>
                      setUpgradeMessage(
                        "To upgrade, contact support@caffeine.ai — we'll activate your Premium account.",
                      )
                    }
                    data-ocid="account-upgrade-btn"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Upgrade
                  </Button>
                  {upgradeMessage && (
                    <p className="text-xs text-muted-foreground max-w-xs text-right">
                      {upgradeMessage}
                    </p>
                  )}
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5"
                data-ocid="account-logout-btn"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" data-ocid="account-tabs">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="collections" className="gap-2">
              <FolderOpen className="h-4 w-4" />
              Collections
            </TabsTrigger>
            <TabsTrigger value="downloads" className="gap-2">
              <Download className="h-4 w-4" />
              Downloads
            </TabsTrigger>
          </TabsList>

          {/* Profile tab */}
          <TabsContent value="profile" data-ocid="tab-profile">
            <div className="max-w-lg bg-card rounded-xl border border-border p-6 space-y-5">
              <h2 className="font-display text-base font-semibold text-foreground">
                Profile Settings
              </h2>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      placeholder="Your username"
                      data-ocid="profile-username-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      placeholder="your@email.com"
                      data-ocid="profile-email-input"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={upsertUser.isPending}
                      data-ocid="profile-save-btn"
                    >
                      {upsertUser.isPending ? "Saving…" : "Save Changes"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        Username
                      </p>
                      <p className="text-sm font-medium text-foreground mt-0.5">
                        {profile?.username ?? "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        Email
                      </p>
                      <p className="text-sm font-medium text-foreground mt-0.5">
                        {profile?.email ?? "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        Downloads Used
                      </p>
                      <p className="text-sm font-medium text-foreground mt-0.5">
                        {profile
                          ? `${Number(profile.downloadCount)} / ${Number(profile.downloadLimit)}`
                          : "—"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={startEdit}
                    data-ocid="profile-edit-btn"
                  >
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Collections tab */}
          <TabsContent value="collections" data-ocid="tab-collections">
            <CollectionsTab />
          </TabsContent>

          {/* Downloads tab */}
          <TabsContent value="downloads" data-ocid="tab-downloads">
            <div className="space-y-3">
              <h2 className="font-display text-base font-semibold text-foreground mb-4">
                Download History
              </h2>
              {!downloads?.length ? (
                <div
                  className="text-center py-16 text-muted-foreground bg-card rounded-xl border border-border"
                  data-ocid="downloads-empty"
                >
                  <Download className="h-10 w-10 mx-auto mb-3 opacity-20" />
                  <p className="font-medium text-foreground">
                    No downloads yet
                  </p>
                  <p className="text-sm">
                    Assets you download will appear here.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <Link
                      to="/search"
                      search={{
                        q: "",
                        page: 1,
                        type: "",
                        category: "",
                        filters: "",
                      }}
                    >
                      Browse Assets
                    </Link>
                  </Button>
                </div>
              ) : (
                downloads.map((record) => (
                  <div
                    key={`${record.assetId.toString()}-${record.downloadedAt.toString()}`}
                    className="flex items-center justify-between p-4 bg-card rounded-lg border border-border"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {record.assetTitle}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {record.format.toUpperCase()} ·{" "}
                        {new Date(
                          Number(record.downloadedAt) / 1_000_000,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <Link
                        to="/assets/$id"
                        params={{ id: record.assetId.toString() }}
                      >
                        View
                      </Link>
                    </Button>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function CollectionsTab() {
  const { data: collections, isLoading } = useMyCollections();
  const createCollection = useCreateCollection();
  const deleteCollection = useDeleteCollection();
  const [newName, setNewName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      await createCollection.mutateAsync(newName.trim());
      toast.success("Collection created!");
      setNewName("");
      setDialogOpen(false);
    } catch {
      toast.error("Failed to create collection.");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteCollection.mutateAsync(id);
      toast.success("Collection deleted.");
    } catch {
      toast.error("Failed to delete collection.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-base font-semibold text-foreground">
          My Collections
        </h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="gap-1.5"
              data-ocid="create-collection-btn"
            >
              <Plus className="h-4 w-4" />
              New Collection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Collection</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="collection-name">Collection Name</Label>
                <Input
                  id="collection-name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Brand Assets, Website Icons…"
                  data-ocid="collection-name-input"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreate}
                  disabled={createCollection.isPending || !newName.trim()}
                  data-ocid="collection-create-submit"
                >
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["a", "b", "c", "d"].map((k) => (
            <Skeleton key={k} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : !collections?.length ? (
        <div
          className="text-center py-16 text-muted-foreground bg-card rounded-xl border border-border"
          data-ocid="collections-empty"
        >
          <FolderOpen className="h-10 w-10 mx-auto mb-3 opacity-20" />
          <p className="font-medium text-foreground">No collections yet</p>
          <p className="text-sm">
            Create collections to organise your saved assets.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((col) => (
            <div
              key={col.id.toString()}
              className="group relative bg-card border border-border rounded-xl p-5 hover:shadow-md transition-smooth"
              data-ocid="collection-card"
            >
              <Link
                to="/collections/$id"
                params={{ id: col.id.toString() }}
                className="block"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-3">
                  <FolderOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground truncate">
                  {col.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {col.assetIds.length} assets
                </p>
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(col.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-smooth h-7 w-7 flex items-center justify-center rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                aria-label="Delete collection"
                data-ocid="collection-delete-btn"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
