'use server'

import { createClient } from '@/lib/supabase/server'
import { AuthError } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'




export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error);
    
    return { errorMessage: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
export async function signup(formData: FormData) {
  const supabase = await createClient()


  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error);
    
    return { errorMessage: error.message }
  }


  revalidatePath('/', 'layout')
  redirect('/profile')
}

export async function logout() {
  const supabase = await createClient()
  console.log("trying to logout")
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}

export async function checkUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated')
  }
  return user?.id;
}

export async function fetchUser() {
    const supabase = await createClient();
    const user = supabase.auth.getUser()
    return user
}

export const providerSignIn = async() => {
  const supabase = await createClient();
  
  // Determine the callback URL based on the environment
  const isProduction = process.env.NODE_ENV === 'production';
  const callbackUrl = isProduction 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    : 'http://localhost:3000/auth/callback';

  console.log(callbackUrl);
    
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: callbackUrl,
      // Add this to ensure proper session handling across domains
      scopes: 'email profile'
    }
  });
  
  if (error) {
    throw new AuthError(error.message);
  }
  
  redirect(data.url ?? "");
}