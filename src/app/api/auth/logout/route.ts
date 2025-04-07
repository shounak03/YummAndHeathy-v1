// app/api/auth/logout/route.js
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'


export async function GET() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  return NextResponse.json({message: "user logged out"},{status:200})
}