import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  AssetType,
  SortOrder,
  Variant_square_portrait_landscape,
} from "../types";
import type { FilterState } from "../types";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const ASSET_TYPES: { value: AssetType; label: string }[] = [
  { value: AssetType.vector, label: "Vectors" },
  { value: AssetType.photo, label: "Photos" },
  { value: AssetType.illustration, label: "Illustrations" },
  { value: AssetType.icon, label: "Icons" },
  { value: AssetType.template, label: "Templates" },
  { value: AssetType.threeD, label: "3D Assets" },
  { value: AssetType.font, label: "Fonts" },
];

const CATEGORIES = [
  "Business",
  "Technology",
  "Nature",
  "People",
  "Abstract",
  "Architecture",
  "Food",
  "Travel",
  "Fashion",
  "Medical",
];

const ORIENTATIONS: {
  value: Variant_square_portrait_landscape;
  label: string;
}[] = [
  { value: Variant_square_portrait_landscape.landscape, label: "Horizontal" },
  { value: Variant_square_portrait_landscape.portrait, label: "Vertical" },
  { value: Variant_square_portrait_landscape.square, label: "Square" },
];

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: SortOrder.relevance, label: "Relevance" },
  { value: SortOrder.newest, label: "Newest" },
  { value: SortOrder.mostDownloaded, label: "Most Downloaded" },
];

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="flex w-full items-center justify-between py-3 text-sm font-semibold text-foreground"
        data-ocid="filter-section-toggle"
        aria-expanded={isOpen}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && <div className="pb-3 space-y-2">{children}</div>}
      <Separator />
    </div>
  );
}

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const toggleAssetType = (type: AssetType) => {
    const current = filters.assetTypes;
    const next = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    onChange({ ...filters, assetTypes: next });
  };

  return (
    <aside className="w-full space-y-0" data-ocid="filter-sidebar">
      <FilterSection title="Asset Type">
        {ASSET_TYPES.map(({ value, label }) => (
          <div key={value} className="flex items-center gap-2.5">
            <Checkbox
              id={`type-${value}`}
              checked={filters.assetTypes.includes(value)}
              onCheckedChange={() => toggleAssetType(value)}
              data-ocid={`filter-type-${value}`}
            />
            <Label
              htmlFor={`type-${value}`}
              className="text-sm cursor-pointer text-foreground/80"
            >
              {label}
            </Label>
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Category">
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() =>
                onChange({
                  ...filters,
                  category: filters.category === cat ? undefined : cat,
                })
              }
              className={`block w-full text-left text-sm px-2 py-1 rounded-md transition-smooth ${
                filters.category === cat
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
              data-ocid={`filter-category-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="License">
        <RadioGroup
          value={filters.licenseType ?? "all"}
          onValueChange={(v) =>
            onChange({
              ...filters,
              licenseType: v === "all" ? undefined : (v as "free" | "premium"),
            })
          }
          data-ocid="filter-license"
        >
          {[
            { value: "all", label: "All" },
            { value: "free", label: "Free" },
            { value: "premium", label: "Premium" },
          ].map(({ value, label }) => (
            <div key={value} className="flex items-center gap-2.5">
              <RadioGroupItem value={value} id={`license-${value}`} />
              <Label
                htmlFor={`license-${value}`}
                className="text-sm cursor-pointer text-foreground/80"
              >
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </FilterSection>

      <FilterSection title="Orientation">
        {ORIENTATIONS.map(({ value, label }) => (
          <div key={value} className="flex items-center gap-2.5">
            <Checkbox
              id={`orient-${value}`}
              checked={filters.orientation === value}
              onCheckedChange={() =>
                onChange({
                  ...filters,
                  orientation:
                    filters.orientation === value ? undefined : value,
                })
              }
              data-ocid={`filter-orientation-${value}`}
            />
            <Label
              htmlFor={`orient-${value}`}
              className="text-sm cursor-pointer text-foreground/80"
            >
              {label}
            </Label>
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Sort By">
        <RadioGroup
          value={filters.sort}
          onValueChange={(v) => onChange({ ...filters, sort: v as SortOrder })}
          data-ocid="filter-sort"
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <div key={value} className="flex items-center gap-2.5">
              <RadioGroupItem value={value} id={`sort-${value}`} />
              <Label
                htmlFor={`sort-${value}`}
                className="text-sm cursor-pointer text-foreground/80"
              >
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </FilterSection>

      {/* Reset */}
      <button
        type="button"
        onClick={() =>
          onChange({
            assetTypes: [],
            category: undefined,
            licenseType: undefined,
            orientation: undefined,
            sort: SortOrder.relevance,
            page: 1,
          })
        }
        className="w-full mt-2 text-sm text-muted-foreground hover:text-foreground transition-smooth underline-offset-2 hover:underline"
        data-ocid="filter-reset"
      >
        Reset all filters
      </button>
    </aside>
  );
}
