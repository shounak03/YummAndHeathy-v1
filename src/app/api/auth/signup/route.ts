import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // options: {
      //   emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/login`,
      //   data: {
      //     email_confirmed: true
      //   }
      // }
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Create a profile record for the user
    // if (data.user) {
    //   const { error: profileError } = await supabase
    //     .from('profiles')
    //     .insert({
    //       id: data.user.id,
    //       email: data.user.email,
    //       created_at: new Date().toISOString(),
    //       updated_at: new Date().toISOString(),
    //     })

    //   if (profileError) {
    //     console.error('Error creating profile:', profileError)
    //     return NextResponse.json(
    //       { error: 'Error creating user profile' },
    //       { status: 500 }
    //     )
    //   }
    // }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 