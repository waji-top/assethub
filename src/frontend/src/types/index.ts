// Re-export types
export type {
  Asset,
  AssetFile,
  AssetFilter,
  AssetId,
  AssetPage,
  CollectionId,
  CollectionPublic,
  CollectionWithAssets,
  DownloadRecord,
  PageRequest,
  SubscriptionStatus,
  Timestamp,
  UserId,
  UserPublic,
} from "../backend";

// Re-export enums (value + type exports in one statement)
export {
  AssetType,
  SortOrder,
  UserTier,
  Variant_square_portrait_landscape,
} from "../backend";

import type {
  AssetType,
  SortOrder,
  Variant_square_portrait_landscape,
} from "../backend";

// License type (from declarations, not re-exported by backend.d.ts)
export type License = { premium: null } | { free: null };

// UI-level filter state
export interface FilterState {
  assetTypes: AssetType[];
  category?: string;
  licenseType?: "free" | "premium";
  orientation?: Variant_square_portrait_landscape;
  sort: SortOrder;
  page: number;
}

export interface SearchState {
  keyword: string;
  page: number;
}

// For display purposes
export type LicenseLabel = "Free" | "Premium" | "Editorial";

export function getLicenseLabel(license: License): LicenseLabel {
  if (typeof license === "object" && license !== null && "premium" in license)
    return "Premium";
  return "Free";
}

export function formatDownloadCount(count: bigint): string {
  const n = Number(count);
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}
