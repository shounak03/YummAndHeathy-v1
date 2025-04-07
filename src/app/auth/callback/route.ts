// import { createClient } from '@/lib/supabase/server'
// import { NextResponse } from 'next/server'
// // The client you created from the Server-Side Auth instructions


// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url)
//   const code = searchParams.get('code')
//   const next = searchParams.get('next') ?? '/'

//   if (code) {
//     const supabase = await createClient()
//     const { error } = await supabase.auth.exchangeCodeForSession(code)
//     if (!error) {
//       const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
//       const isLocalEnv = process.env.NODE_ENV === 'development'
//       if (isLocalEnv) {
//         // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
//         return NextResponse.redirect(`${origin}${next}`)
//       } else if (forwardedHost) {
//         return NextResponse.redirect(`https://${forwardedHost}${next}`)
//       } else {
//         return NextResponse.redirect(`${origin}${next}`)
//       }
//     }
//   }

//   // return the user to an error page with instructions
//   return NextResponse.redirect(`${origin}/auth/auth-code-error`)
// }

// auth/callback/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const { searchParams } = requestUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard' // Direct to dashboard after login
  
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error("Auth error:", error)
      return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error`)
    }
    
    // Force setting of cookies before redirect
    const response = NextResponse.redirect(`${requestUrl.origin}${next}`)
    
    // Add Cache-Control header to prevent caching of auth responses
    response.headers.set('Cache-Control', 'no-store, max-age=0')
    
    return response
  }

  return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error`)
}