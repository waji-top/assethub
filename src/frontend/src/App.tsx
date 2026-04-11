import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout";

import { Skeleton } from "@/components/ui/skeleton";
// Lazy-loaded page components will be imported inline
import { Suspense, lazy } from "react";

const HomePage = lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.HomePage })),
);
const SearchPage = lazy(() =>
  import("./pages/Search").then((m) => ({ default: m.SearchPage })),
);
const AssetDetailPage = lazy(() =>
  import("./pages/AssetDetail").then((m) => ({ default: m.AssetDetailPage })),
);
const AccountPage = lazy(() =>
  import("./pages/Account").then((m) => ({ default: m.AccountPage })),
);
const CollectionDetailPage = lazy(() =>
  import("./pages/CollectionDetail").then((m) => ({
    default: m.CollectionDetailPage,
  })),
);

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col gap-4 p-8 max-w-7xl mx-auto w-full">
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((id) => (
          <Skeleton key={id} className="h-48 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// Root route with Layout wrapper
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <Toaster position="bottom-right" richColors />
    </Layout>
  ),
});

// Routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) ?? "",
    page: Number(search.page ?? 1),
    type: (search.type as string) ?? "",
    category: (search.category as string) ?? "",
    filters: (search.filters as string) ?? "",
  }),
});

const assetDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/assets/$id",
  component: AssetDetailPage,
});

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: AccountPage,
});

const collectionDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collections/$id",
  component: CollectionDetailPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  searchRoute,
  assetDetailRoute,
  accountRoute,
  collectionDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
