import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useCallback, useState } from "react";

interface SearchBarProps {
  initialValue?: string;
  placeholder?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  onSearch?: (keyword: string) => void;
}

export function SearchBar({
  initialValue = "",
  placeholder = "Search vectors, photos, icons, templates…",
  className = "",
  size = "md",
  onSearch,
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!value.trim()) return;
      if (onSearch) {
        onSearch(value.trim());
      } else {
        navigate({
          to: "/search",
          search: {
            q: value.trim(),
            page: 1,
            type: "",
            category: "",
            filters: "",
          },
        });
      }
    },
    [value, onSearch, navigate],
  );

  const sizeClasses = {
    sm: "h-9 text-sm pl-9",
    md: "h-11 text-sm pl-10",
    lg: "h-14 text-base pl-12",
  };

  const iconSizeClasses = {
    sm: "h-4 w-4 left-2.5",
    md: "h-4 w-4 left-3",
    lg: "h-5 w-5 left-3.5",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative ${className}`}
      data-ocid="search-form"
    >
      <Search
        className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none ${iconSizeClasses[size]}`}
      />
      <Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`${sizeClasses[size]} rounded-full border-border bg-card shadow-sm focus-visible:ring-primary/50 pr-4`}
        data-ocid="search-input"
        aria-label="Search assets"
      />
    </form>
  );
}
