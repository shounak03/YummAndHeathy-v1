import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id

    if (!userId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('saved_recipes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching saved recipes:', error)
      return NextResponse.json({ error: 'Failed to fetch saved recipes' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in recipes API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id

    if (!userId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }

    const body = await request.json()
    const { recipe } = body

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe data is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('saved_recipes')
      .insert({
        user_id: userId,
        recipe_data: recipe,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving recipe:', error)
      return NextResponse.json({ error: 'Failed to save recipe' }, { status: 500 })
    }

    return NextResponse.json({ id: data.id })
  } catch (error) {
    console.error('Error in recipes API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 