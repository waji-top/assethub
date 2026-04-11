import { c as createLucideIcon, x as useParams, u as useNavigate, y as useAuth, z as useMyProfile, U as UserTier, j as jsxRuntimeExports, D as Skeleton, d as Button, L as Link, B as Badge, E as ue } from "./index-AQ6D2SeO.js";
import { S as Separator } from "./separator-0Tz6cZ3_.js";
import { b as useAsset, c as useIncrementDownload, d as useTrackDownload } from "./use-assets-CQ5C3UmW.js";
import { E as Eye, g as getLicenseLabel, f as formatDownloadCount } from "./index-CBlFNOWN.js";
import { A as ArrowLeft } from "./arrow-left-RCKDYDKg.js";
import { U as User } from "./user-DolZjkPq.js";
import { D as Download } from "./download-AKDWoY1f.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function AssetDetailPage() {
  const { id } = useParams({ from: "/assets/$id" });
  const navigate = useNavigate();
  const assetId = BigInt(id);
  const { data: asset, isLoading } = useAsset(assetId);
  const { isAuthenticated, login } = useAuth();
  const { data: profile } = useMyProfile();
  const increment = useIncrementDownload();
  const track = useTrackDownload();
  const isPremiumUser = (profile == null ? void 0 : profile.tier) === UserTier.premium;
  const handleDownload = async (url, format) => {
    if (!isAuthenticated) {
      ue.info("Please sign in to download assets.");
      login();
      return;
    }
    try {
      await increment.mutateAsync(assetId);
      await track.mutateAsync({ assetId, format });
      window.open(url, "_blank");
      ue.success("Download started!");
    } catch {
      ue.error("Could not start download. Please try again.");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32 mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-32" })
        ] })
      ] })
    ] });
  }
  if (!asset) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 text-muted-foreground",
        "data-ocid": "asset-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-12 w-12 opacity-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Asset not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/search",
              search: { q: "", page: 1, type: "", category: "", filters: "" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
                "Browse assets"
              ]
            }
          ) })
        ]
      }
    );
  }
  const licenseLabel = getLicenseLabel(asset.license);
  const isPremium = licenseLabel === "Premium";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background", "data-ocid": "asset-detail", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/search",
        search: { q: "", page: 1, type: "", category: "", filters: "" },
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth",
        "data-ocid": "back-to-search",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          "Back to search"
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden bg-muted aspect-[4/3]", children: [
          asset.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: asset.thumbnailUrl,
              alt: asset.title,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-12 w-12 text-muted-foreground/30" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs font-semibold px-2.5 py-1 rounded-full ${isPremium ? "bg-accent/90 text-accent-foreground" : "bg-card/90 text-foreground"}`,
              children: licenseLabel
            }
          ) })
        ] }),
        asset.previewUrls.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: asset.previewUrls.slice(0, 4).map((url, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: url,
            alt: `Preview ${idx + 1}`,
            className: "h-16 w-16 rounded-lg object-cover border border-border flex-shrink-0"
          },
          url
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "capitalize text-xs", children: asset.assetType }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: asset.category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground mb-2", children: asset.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "By",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: asset.authorName })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: asset.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
            formatDownloadCount(asset.downloadCount),
            " downloads"
          ] }),
          asset.dimensions && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            Number(asset.dimensions.width),
            " ×",
            " ",
            Number(asset.dimensions.height),
            " px"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: "Download Formats" }),
          asset.fileFormats.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: asset.fileFormats.map((file) => {
            const isLocked = isPremium && !isPremiumUser;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium uppercase text-foreground", children: file.format }),
                  isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      onClick: () => navigate({ to: "/account" }),
                      className: "gap-1.5 border-accent/40 text-accent hover:bg-accent/10",
                      "data-ocid": `download-locked-${file.format}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5" }),
                        "Upgrade"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      onClick: () => handleDownload(file.url, file.format),
                      className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5",
                      "data-ocid": `download-btn-${file.format}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
                        "Download"
                      ]
                    }
                  )
                ]
              },
              file.url
            );
          }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No download formats available." })
        ] }),
        asset.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5 text-muted-foreground" }),
          asset.tags.slice(0, 8).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/search",
              search: {
                q: tag,
                page: 1,
                type: "",
                category: "",
                filters: ""
              },
              className: "text-xs text-muted-foreground hover:text-primary transition-smooth bg-secondary rounded-full px-2.5 py-0.5",
              children: [
                "#",
                tag
              ]
            },
            tag
          ))
        ] }) }),
        isPremium && !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-accent/8 border border-accent/20 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium mb-2", children: "Premium Asset" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Sign in and upgrade to premium to download this asset." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: login,
              className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5",
              children: "Sign in to Download"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AssetDetailPage
};
