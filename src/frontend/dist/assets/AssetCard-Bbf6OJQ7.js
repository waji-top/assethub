import { j as jsxRuntimeExports, D as Skeleton, r as reactExports, L as Link } from "./index-AQ6D2SeO.js";
import { E as Eye, f as formatDownloadCount, g as getLicenseLabel } from "./index-CBlFNOWN.js";
import { D as Download } from "./download-AKDWoY1f.js";
function LicenseBadge({ license }) {
  const label = getLicenseLabel(license);
  const isPremium = label === "Premium";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${isPremium ? "bg-accent/15 text-accent" : "bg-secondary text-secondary-foreground"}`,
      children: [
        isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px]", children: "★" }),
        label
      ]
    }
  );
}
function AssetCard({ asset, className = "" }) {
  const [imageLoaded, setImageLoaded] = reactExports.useState(false);
  const [imgError, setImgError] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/assets/$id",
      params: { id: asset.id.toString() },
      className: `group block rounded-xl overflow-hidden bg-card border border-border transition-smooth hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`,
      "data-ocid": "asset-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-muted", children: [
          !imageLoaded && !imgError && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "absolute inset-0 rounded-none" }),
          !imgError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: asset.thumbnailUrl,
              alt: asset.title,
              onLoad: () => setImageLoaded(true),
              onError: () => setImgError(true),
              className: `w-full h-full object-cover transition-smooth group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-8 w-8 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "No preview" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-smooth flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-0 group-hover:opacity-100 transition-smooth bg-card text-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-md", children: "View Details" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-background/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-foreground capitalize", children: asset.assetType }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "text-sm font-semibold text-foreground truncate leading-snug mb-0.5",
              title: asset.title,
              children: asset.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate mb-2", children: [
            "By ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/70", children: asset.authorName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LicenseBadge, { license: asset.license }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px]", children: formatDownloadCount(asset.downloadCount) })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function AssetCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden bg-card border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] rounded-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-14" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-12" })
      ] })
    ] })
  ] });
}
export {
  AssetCardSkeleton as A,
  AssetCard as a
};
