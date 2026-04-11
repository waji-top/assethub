import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Download, Eye, Lock, Tag, User } from "lucide-react";
import { toast } from "sonner";
import {
  useAsset,
  useIncrementDownload,
  useTrackDownload,
} from "../hooks/use-assets";
import { useAuth } from "../hooks/use-auth";
import { useMyProfile } from "../hooks/use-user";
import { UserTier, formatDownloadCount, getLicenseLabel } from "../types";

export function AssetDetailPage() {
  const { id } = useParams({ from: "/assets/$id" });
  const navigate = useNavigate();
  const assetId = BigInt(id);

  const { data: asset, isLoading } = useAsset(assetId);
  const { isAuthenticated, login } = useAuth();
  const { data: profile } = useMyProfile();
  const increment = useIncrementDownload();
  const track = useTrackDownload();

  const isPremiumUser = profile?.tier === UserTier.premium;

  const handleDownload = async (url: string, format: string) => {
    if (!isAuthenticated) {
      toast.info("Please sign in to download assets.");
      login();
      return;
    }
    try {
      await increment.mutateAsync(assetId);
      await track.mutateAsync({ assetId, format });
      window.open(url, "_blank");
      toast.success("Download started!");
    } catch {
      toast.error("Could not start download. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Skeleton className="h-5 w-32 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Skeleton className="aspect-[4/3] rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-muted-foreground"
        data-ocid="asset-not-found"
      >
        <Eye className="h-12 w-12 opacity-20" />
        <p className="font-semibold text-foreground">Asset not found</p>
        <Button variant="outline" asChild>
          <Link
            to="/search"
            search={{ q: "", page: 1, type: "", category: "", filters: "" }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Browse assets
          </Link>
        </Button>
      </div>
    );
  }

  const licenseLabel = getLicenseLabel(asset.license);
  const isPremium = licenseLabel === "Premium";

  return (
    <div className="bg-background" data-ocid="asset-detail">
      {/* Back nav */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link
            to="/search"
            search={{ q: "", page: 1, type: "", category: "", filters: "" }}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth"
            data-ocid="back-to-search"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to search
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Preview */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
              {asset.thumbnailUrl ? (
                <img
                  src={asset.thumbnailUrl}
                  alt={asset.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Eye className="h-12 w-12 text-muted-foreground/30" />
                </div>
              )}
              <div className="absolute top-3 right-3">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    isPremium
                      ? "bg-accent/90 text-accent-foreground"
                      : "bg-card/90 text-foreground"
                  }`}
                >
                  {licenseLabel}
                </span>
              </div>
            </div>
            {/* Preview thumbnails */}
            {asset.previewUrls.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {asset.previewUrls.slice(0, 4).map((url, idx) => (
                  <img
                    key={url}
                    src={url}
                    alt={`Preview ${idx + 1}`}
                    className="h-16 w-16 rounded-lg object-cover border border-border flex-shrink-0"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="secondary" className="capitalize text-xs">
                  {asset.assetType}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {asset.category}
                </Badge>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {asset.title}
              </h1>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>
                  By{" "}
                  <strong className="text-foreground">
                    {asset.authorName}
                  </strong>
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {asset.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                {formatDownloadCount(asset.downloadCount)} downloads
              </span>
              {asset.dimensions && (
                <span>
                  {Number(asset.dimensions.width)} ×{" "}
                  {Number(asset.dimensions.height)} px
                </span>
              )}
            </div>

            <Separator />

            {/* Download options */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Download Formats
              </h3>
              {asset.fileFormats.length > 0 ? (
                <div className="space-y-2">
                  {asset.fileFormats.map((file) => {
                    // Premium assets require a premium user tier to download
                    const isLocked = isPremium && !isPremiumUser;
                    return (
                      <div
                        key={file.url}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
                      >
                        <span className="text-sm font-medium uppercase text-foreground">
                          {file.format}
                        </span>
                        {isLocked ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate({ to: "/account" })}
                            className="gap-1.5 border-accent/40 text-accent hover:bg-accent/10"
                            data-ocid={`download-locked-${file.format}`}
                          >
                            <Lock className="h-3.5 w-3.5" />
                            Upgrade
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() =>
                              handleDownload(file.url, file.format)
                            }
                            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
                            data-ocid={`download-btn-${file.format}`}
                          >
                            <Download className="h-3.5 w-3.5" />
                            Download
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No download formats available.
                </p>
              )}
            </div>

            {/* Tags */}
            {asset.tags.length > 0 && (
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                  {asset.tags.slice(0, 8).map((tag) => (
                    <Link
                      key={tag}
                      to="/search"
                      search={{
                        q: tag,
                        page: 1,
                        type: "",
                        category: "",
                        filters: "",
                      }}
                      className="text-xs text-muted-foreground hover:text-primary transition-smooth bg-secondary rounded-full px-2.5 py-0.5"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {isPremium && !isAuthenticated && (
              <div className="rounded-lg bg-accent/8 border border-accent/20 p-4">
                <p className="text-sm text-foreground font-medium mb-2">
                  Premium Asset
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Sign in and upgrade to premium to download this asset.
                </p>
                <Button
                  size="sm"
                  onClick={login}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
                >
                  Sign in to Download
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
