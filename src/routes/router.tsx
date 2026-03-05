import {
  createRouter,
  createRootRouteWithContext,
  createRoute,
} from "@tanstack/react-router";
import type { RouterContext } from "./router-context";
import { HomePage } from "@/pages/HomePage";
import RootLayout from "@/rootLayout";

// =======================================================
// Root
// =======================================================
const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
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