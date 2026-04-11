import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Download, Eye } from "lucide-react";
import { useState } from "react";
import type { Asset, License } from "../types";
import { formatDownloadCount, getLicenseLabel } from "../types";

interface AssetCardProps {
  asset: Asset;
  className?: string;
}

function LicenseBadge({ license }: { license: License }) {
  const label = getLicenseLabel(license);
  const isPremium = label === "Premium";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        isPremium
          ? "bg-accent/15 text-accent"
          : "bg-secondary text-secondary-foreground"
      }`}
    >
      {isPremium && <span className="text-[8px]">★</span>}
      {label}
    </span>
  );
}

export function AssetCard({ asset, className = "" }: AssetCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to="/assets/$id"
      params={{ id: asset.id.toString() }}
      className={`group block rounded-xl overflow-hidden bg-card border border-border transition-smooth hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
      data-ocid="asset-card"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {!imageLoaded && !imgError && (
          <Skeleton className="absolute inset-0 rounded-none" />
        )}
        {!imgError ? (
          <img
            src={asset.thumbnailUrl}
            alt={asset.title}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-smooth group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Eye className="h-8 w-8 opacity-30" />
              <span className="text-xs">No preview</span>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-smooth flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-smooth bg-card text-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
            View Details
          </span>
        </div>

        {/* Type tag */}
        <div className="absolute top-2 left-2">
          <span className="rounded-md bg-background/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-foreground capitalize">
            {asset.assetType}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3
          className="text-sm font-semibold text-foreground truncate leading-snug mb-0.5"
          title={asset.title}
        >
          {asset.title}
        </h3>
        <p className="text-xs text-muted-foreground truncate mb-2">
          By <span className="text-foreground/70">{asset.authorName}</span>
        </p>
        <div className="flex items-center justify-between">
          <LicenseBadge license={asset.license} />
          <div className="flex items-center gap-1 text-muted-foreground">
            <Download className="h-3 w-3" />
            <span className="text-[11px]">
              {formatDownloadCount(asset.downloadCount)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function AssetCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}
