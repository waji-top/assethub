import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { AssetCard } from "../components/AssetCard";
import { useAuth } from "../hooks/use-auth";
import { useCollection } from "../hooks/use-collections";

export function CollectionDetailPage() {
  const { id } = useParams({ from: "/collections/$id" });
  const collectionId = BigInt(id);
  const { data: collection, isLoading } = useCollection(collectionId);
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4"
        data-ocid="collection-auth-gate"
      >
        <FolderOpen className="h-12 w-12 text-muted-foreground/30" />
        <p className="font-semibold text-foreground">
          Sign in to view your collections
        </p>
        <Button onClick={login} data-ocid="collection-signin-btn">
          Sign In
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
            <Skeleton key={k} className="aspect-[4/3] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
        data-ocid="collection-not-found"
      >
        <FolderOpen className="h-12 w-12 text-muted-foreground/30" />
        <p className="font-semibold text-foreground">Collection not found</p>
        <Button variant="outline" asChild>
          <Link to="/account">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Account
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen" data-ocid="collection-detail">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/account"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-4"
            data-ocid="back-to-account"
          >
            <ArrowLeft className="h-4 w-4" />
            My Collections
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FolderOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                {collection.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {collection.assets.length} assets
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Assets grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {collection.assets.length === 0 ? (
          <div
            className="text-center py-20 text-muted-foreground"
            data-ocid="collection-empty"
          >
            <FolderOpen className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="font-semibold text-foreground">
              This collection is empty
            </p>
            <p className="text-sm mt-1">
              Browse assets and save them to this collection.
            </p>
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <Link
                to="/search"
                search={{ q: "", page: 1, type: "", category: "", filters: "" }}
              >
                Browse Assets
              </Link>
            </Button>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            data-ocid="collection-assets-grid"
          >
            {collection.assets.map((asset) => (
              <AssetCard key={asset.id.toString()} asset={asset} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
