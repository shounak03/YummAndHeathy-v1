import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    
    if (!id) {
      return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 })
    }

    const supabase = await createClient()
    
    // First verify the user has access to this recipe
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id

    if (!userId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('saved_recipes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
    }

    // Check if this recipe belongs to the current user
    if (data.user_id !== userId) {
      return NextResponse.json({ error: 'Not authorized to access this recipe' }, { status: 403 })
    }

    // Return the recipe data
    return NextResponse.json(data.recipe_data)
  } catch (error) {
    console.error('Error fetching recipe:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 