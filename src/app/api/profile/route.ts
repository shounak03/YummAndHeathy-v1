import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const supabase = createRouteHandlerClient({ cookies })
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const {
      userId,
      name,
      age,
      gender,
      location,
      dietary_restrictions,
      allergies,
      dislikes,
      primary_goal,
      calorie_intake,
      macronutrient_preferences,
      cooking_skill_level,
      time_availability,
      kitchen_tools,
      meal_types,
      cuisine_preferences,
      portion_size,
      activity_level,
      eating_out_frequency,
      food_budget,
      spice_tolerance,
      meal_variety,
      sustainability
    } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        name,
        age,
        gender,
        location,
        dietary_restrictions,
        allergies,
        dislikes,
        primary_goal,
        calorie_intake,
        macronutrient_preferences,
        cooking_skill_level,
        time_availability,
        kitchen_tools,
        meal_types,
        cuisine_preferences,
        portion_size,
        activity_level,
        eating_out_frequency,
        food_budget,
        spice_tolerance,
        meal_variety,
        sustainability,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 