import {
  createRouter,
  Outlet,
  createRootRouteWithContext,
  createRoute,
} from "@tanstack/react-router";
import type { RouterContext } from "./router-context";
import { HomePage } from "@/pages/HomePage";

// =======================================================
// Root
// =======================================================
const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="h-screen w-screen flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  ),
});

// =======================================================
// Public: /
// =======================================================
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
]);

export const router = createRouter({
  routeTree,
  context: {} as RouterContext,
});