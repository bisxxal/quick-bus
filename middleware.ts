import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'


const tenantKeys = {
  tenant1: { publishableKey: 'pk_tenant1...', secretKey: 'sk_tenant1...' },
  tenant2: { publishableKey: 'pk_tenant2...', secretKey: 'sk_tenant2...' },
}

// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

const isProtectedRoute = createRouteMatcher([
    '/ticket(.*)',
    // '/api/webhook(.*)',
    '/admin(.*)',
    '/profile(.*)',
])

export default clerkMiddleware(async (auth, request) => {
    if (isProtectedRoute(request)) {
      await auth.protect()
    }
  })

export const config = {
  matcher: [ 
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher([
//     '/dashboard(.*)',
//     '/api/payment(.*)',
//     '/callback(.*)',
// ]) 

// export default clerkMiddleware(async (auth, request) => {
//     if (isProtectedRoute(request)) {
//       await auth.protect()
//     }
//   })
// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)',
//   ],
// };