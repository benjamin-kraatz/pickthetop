import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isSetupRoute = createRouteMatcher(["/setup(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/login(.*)",
  "/register(.*)",
  "/rules(.*)",
]);

// const homePath = "/";
const gamePath = "/game";

export default clerkMiddleware(async (auth, req) => {
  // We have to mention API/tRPC in the matcher, but we always allow access to them.
  // tRPC is configured to handle auth, so we don't need to check for userId here.
  if (
    req.nextUrl.pathname.startsWith("/api") ||
    req.nextUrl.pathname.startsWith("/trpc")
  ) {
    return NextResponse.next();
  }

  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // For users visiting /setup, don't try to redirect.
  // But if they have already completed setup, redirect straight to the game.
  if (userId && isSetupRoute(req)) {
    if (sessionClaims?.metadata?.setupComplete) {
      return NextResponse.redirect(new URL(gamePath, req.url));
    }
    return NextResponse.next();
  }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // Redirect them to the /setup route to complete onboarding
  if (userId && !sessionClaims?.metadata?.setupComplete) {
    const setupUrl = new URL("/setup", req.url);
    return NextResponse.redirect(setupUrl);
  }

  // If the user is logged in and the route is protected, let them view.
  if (userId && !isPublicRoute(req)) {
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
