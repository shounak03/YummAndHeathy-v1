
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { createClient } from './lib/supabase/server'


// export async function middleware(req: NextRequest) {
  
//   // const headers = new Headers(req.headers);
//   // headers.set("x-current-path", req.nextUrl.pathname);
//   const res = NextResponse.next();
  

//   if (req.nextUrl.pathname === '/') {
//     return res
//   }
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()
  
  
//   if (!user && !req.nextUrl.pathname.startsWith('/auth')) {
//     return NextResponse.redirect(new URL('/auth/login', req.url))
//   }


//   if (user && req.nextUrl.pathname.startsWith('/auth')) {
//     return NextResponse.redirect(new URL('/profile', req.url))
//   }


//   if (user && (req.nextUrl.pathname === '/dashboard' ||  req.nextUrl.pathname === '/profile' )) {
//     const { data: profile } = await supabase
//     .from('profiles')
//     .select('id')
//     .eq('id', user.id)
//     .single()

    
//     if (!profile) {
//       return NextResponse.redirect(new URL('/create-profile', req.url))
//     }
//   }

//   if (user && req.nextUrl.pathname === '/create-profile') {
//     const { data: profile } = await supabase
//     .from('profiles')
//     .select('id')
//     .eq('id', user.id)
//     .single()

    
//     if (profile) {
//       return NextResponse.redirect(new URL('/profile', req.url))
//     }
//   }



//   return res
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      */
//     '/((?!_next/static|_next/image|favicon.ico|public).*)',
//   ],
// } 

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from './lib/supabase/server'

export async function middleware(req: NextRequest) {
  // Create a response first
  const res = NextResponse.next()
  
  // Then set the custom header on that response
  res.headers.set("x-current-path", req.nextUrl.pathname)

  if (req.nextUrl.pathname === '/') {
    return res
  }
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  console.log("user",user);
  
  
  if (!user && !req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  if (user && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/profile', req.url))
  }

  if (user && (req.nextUrl.pathname === '/dashboard' ||  req.nextUrl.pathname === '/profile' || req.nextUrl.pathname === '/chat' )) {
    const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single()
    
    if (!profile) {
      return NextResponse.redirect(new URL('/create-profile', req.url))
    }
  }

  if (user && req.nextUrl.pathname === '/create-profile') {
    const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single()
    
    if (profile) {
      return NextResponse.redirect(new URL('/profile', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}