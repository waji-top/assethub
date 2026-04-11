import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { AssetCard, AssetCardSkeleton } from "../components/AssetCard";
import { FilterSidebar } from "../components/FilterSidebar";
import { SearchBar } from "../components/SearchBar";
import { useListAssets, useSearchAssets } from "../hooks/use-assets";
import type { FilterState } from "../types";
import {
  type AssetType,
  SortOrder,
  type Variant_square_portrait_landscape,
} from "../types";

const PAGE_SIZE = 20n;

const DEFAULT_FILTERS: FilterState = {
  assetTypes: [],
  category: undefined,
  licenseType: undefined,
  orientation: undefined,
  sort: SortOrder.relevance,
  page: 1,
};

const SKELETON_KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
];

function buildAssetFilter(filters: FilterState) {
  return {
    tags: [],
    category: filters.category,
    assetType:
      filters.assetTypes.length === 1 ? filters.assetTypes[0] : undefined,
    license: undefined,
    orientation: filters.orientation,
  };
}

export function SearchPage() {
  const params = useSearch({ from: "/search" });
  const navigate = useNavigate();

  // Restore filter state from URL on mount
  const [filters, setFilters] = useState<FilterState>(() => {
    let assetTypes: AssetType[] = [];
    let orientation: Variant_square_portrait_landscape | undefined = undefined;
    let licenseType: "free" | "premium" | undefined = undefined;
    let sort: SortOrder = SortOrder.relevance;

    try {
      if (params.filters) {
        const parsed = JSON.parse(decodeURIComponent(params.filters));
        assetTypes = parsed.assetTypes ?? [];
        orientation = parsed.orientation;
        licenseType = parsed.licenseType;
        sort = parsed.sort ?? SortOrder.relevance;
      }
    } catch {
      // ignore parse errors — fall back to defaults
    }

    return {
      assetTypes,
      category: params.category || undefined,
      licenseType,
      orientation,
      sort,
      page: params.page ?? 1,
    };
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const keyword = params.q ?? "";
  const page = filters.page;
  const pageRequest = {
    offset: BigInt(page - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  };

  const isSearching = keyword.length > 0;
  const searchResult = useSearchAssets(keyword, pageRequest);
  const listResult = useListAssets(
    buildAssetFilter(filters),
    filters.sort,
    pageRequest,
  );

  const { data, isLoading } = isSearching ? searchResult : listResult;
  const total = Number(data?.total ?? 0n);
  const totalPages = Math.ceil(total / Number(PAGE_SIZE));

  const handleSearch = (kw: string) => {
    navigate({
      to: "/search",
      search: { q: kw, page: 1, type: "", category: "", filters: "" },
    });
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Encode non-trivial filter state into URL
    const filtersPayload = {
      assetTypes: newFilters.assetTypes,
      orientation: newFilters.orientation,
      licenseType: newFilters.licenseType,
      sort: newFilters.sort,
    };
    const hasFilters =
      newFilters.assetTypes.length > 0 ||
      newFilters.orientation !== undefined ||
      newFilters.licenseType !== undefined ||
      newFilters.sort !== SortOrder.relevance;

    navigate({
      to: "/search",
      search: {
        q: keyword,
        page: newFilters.page,
        type: "",
        category: newFilters.category ?? "",
        filters: hasFilters
          ? encodeURIComponent(JSON.stringify(filtersPayload))
          : "",
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search header */}
      <div className="bg-card border-b border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar
            initialValue={keyword}
            size="md"
            onSearch={handleSearch}
            className="max-w-2xl"
          />
          {keyword && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm text-muted-foreground">
                Results for{" "}
                <strong className="text-foreground">"{keyword}"</strong>
              </span>
              <button
                type="button"
                onClick={() =>
                  navigate({
                    to: "/search",
                    search: {
                      q: "",
                      page: 1,
                      type: "",
                      category: "",
                      filters: "",
                    },
                  })
                }
                className="text-muted-foreground hover:text-foreground transition-smooth"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filter sidebar — desktop */}
          <aside
            className="hidden lg:block w-56 flex-shrink-0"
            data-ocid="filter-sidebar-desktop"
          >
            <FilterSidebar filters={filters} onChange={handleFilterChange} />
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-sm text-muted-foreground">
                  {isLoading ? "Loading…" : `${total.toLocaleString()} assets`}
                </span>
              </div>

              {/* Mobile filter trigger */}
              <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden gap-2"
                    data-ocid="mobile-filter-btn"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 overflow-y-auto">
                  <SheetHeader className="mb-4">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <FilterSidebar
                    filters={filters}
                    onChange={handleFilterChange}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Grid */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
              data-ocid="assets-grid"
            >
              {isLoading
                ? SKELETON_KEYS.map((k) => <AssetCardSkeleton key={k} />)
                : (data?.items ?? []).map((asset) => (
                    <AssetCard key={asset.id.toString()} asset={asset} />
                  ))}
            </div>

            {/* Empty state */}
            {!isLoading && !data?.items?.length && (
              <div
                className="text-center py-24 text-muted-foreground"
                data-ocid="empty-state"
              >
                <div className="text-5xl mb-4 opacity-20">◎</div>
                <p className="font-semibold text-foreground">
                  No results found
                </p>
                <p className="text-sm mt-1">
                  Try different keywords or adjust your filters.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => handleFilterChange(DEFAULT_FILTERS)}
                  data-ocid="reset-filters-btn"
                >
                  Reset filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                className="flex items-center justify-center gap-2 mt-10"
                data-ocid="pagination"
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() =>
                    handleFilterChange({ ...filters, page: filters.page - 1 })
                  }
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground px-3">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() =>
                    handleFilterChange({ ...filters, page: filters.page + 1 })
                  }
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
