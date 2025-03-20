import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { errorMessage: 'Email and password are required' }
  }

  try {
    const supabase = await createClient()

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/login`,
        data: {
          email_confirmed: true
        }
      }
    })

    if (authError) {
      return { errorMessage: authError.message }
    }

    // Create a profile record for the user
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

      if (profileError) {
        console.error('Error creating profile:', profileError)
        return { errorMessage: 'Error creating user profile' }
      }
    }

    redirect('/dashboard')
  } catch (error) {
    console.error('Signup error:', error)
    return { errorMessage: 'An error occurred during signup' }
  }
}

export async function signin(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { errorMessage: 'Email and password are required' }
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { errorMessage: error.message }
    }

    redirect('/dashboard')
  } catch (error) {
    console.error('Signin error:', error)
    return { errorMessage: 'An error occurred during signin' }
  }
}

export async function signout() {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { errorMessage: error.message }
    }

    redirect('/auth/login')
  } catch (error) {
    console.error('Signout error:', error)
    return { errorMessage: 'An error occurred during signout' }
  }
} 