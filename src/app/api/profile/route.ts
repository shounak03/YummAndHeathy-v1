import { createClient } from '@/lib/supabase/server'

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

export async function POST(request: Request) {
  try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const userId = user?.id
      console.log("in api");
      if (!userId) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
      }
    const {
      name,
      age,
      gender,
      current_weight,
      target_weight,
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



    // Validate macronutrient preferences sum to 100
    if (macronutrient_preferences) {
      const { protein, carbs, fats } = macronutrient_preferences
      const total = protein + carbs + fats
      if (total !== 100) {
        return NextResponse.json(
          { error: 'Macronutrient preferences must sum to 100%' },
          { status: 400 }
        )
      }
    }
    console.log("trying to save");
    
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        name,
        age,
        gender,
        current_weight,
        target_weight,
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
      console.log(error);
      
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 