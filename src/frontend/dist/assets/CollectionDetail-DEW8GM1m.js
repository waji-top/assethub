import { x as useParams, y as useAuth, j as jsxRuntimeExports, d as Button, D as Skeleton, L as Link } from "./index-AQ6D2SeO.js";
import { a as AssetCard } from "./AssetCard-Bbf6OJQ7.js";
import { c as useCollection, F as FolderOpen } from "./use-collections-hDK0Inqt.js";
import { A as ArrowLeft } from "./arrow-left-RCKDYDKg.js";
import "./index-CBlFNOWN.js";
import "./download-AKDWoY1f.js";
function CollectionDetailPage() {
  const { id } = useParams({ from: "/collections/$id" });
  const collectionId = BigInt(id);
  const { data: collection, isLoading } = useCollection(collectionId);
  const { isAuthenticated, login } = useAuth();
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4",
        "data-ocid": "collection-auth-gate",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-12 w-12 text-muted-foreground/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Sign in to view your collections" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "collection-signin-btn", children: "Sign In" })
        ]
      }
    );
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] rounded-xl" }, k)) })
    ] });
  }
  if (!collection) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-4",
        "data-ocid": "collection-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-12 w-12 text-muted-foreground/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Collection not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/account", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
            "Back to Account"
          ] }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "collection-detail", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/account",
          className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-4",
          "data-ocid": "back-to-account",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "My Collections"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: collection.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            collection.assets.length,
            " assets"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: collection.assets.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-20 text-muted-foreground",
        "data-ocid": "collection-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-12 w-12 mx-auto mb-3 opacity-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "This collection is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Browse assets and save them to this collection." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "mt-4", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/search",
              search: { q: "", page: 1, type: "", category: "", filters: "" },
              children: "Browse Assets"
            }
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
        "data-ocid": "collection-assets-grid",
        children: collection.assets.map((asset) => /* @__PURE__ */ jsxRuntimeExports.jsx(AssetCard, { asset }, asset.id.toString()))
      }
    ) })
  ] });
}
export {
  CollectionDetailPage
};
