import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { pipeline } from '@xenova/transformers'

// Initialize the embedding model
const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const supabase = await createClient()
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

    // Create a text representation of the profile data for embedding
    const profileText = `
      Name: ${name || ''}
      Age: ${age || ''}
      Gender: ${gender || ''}
      Current Weight: ${current_weight || ''}
      Target Weight: ${target_weight || ''}
      Location: ${location || ''}
      Dietary Restrictions: ${dietary_restrictions || ''}
      Allergies: ${allergies || ''}
      Dislikes: ${dislikes || ''}
      Primary Goal: ${primary_goal || ''}
      Calorie Intake: ${calorie_intake || ''}
      Macronutrient Preferences: ${JSON.stringify(macronutrient_preferences || {})}
      Cooking Skill Level: ${cooking_skill_level || ''}
      Time Availability: ${time_availability || ''}
      Kitchen Tools: ${kitchen_tools || ''}
      Meal Types: ${meal_types || ''}
      Cuisine Preferences: ${cuisine_preferences || ''}
      Portion Size: ${portion_size || ''}
      Activity Level: ${activity_level || ''}
      Eating Out Frequency: ${eating_out_frequency || ''}
      Food Budget: ${food_budget || ''}
      Spice Tolerance: ${spice_tolerance || ''}
      Meal Variety: ${meal_variety || ''}
      Sustainability: ${sustainability || ''}
    `.trim()

    // Generate embedding
    const embedding = await embedder(profileText, {
      pooling: 'mean',
      normalize: true
    })

    // Convert embedding from object to array format for pgvector
    const embeddingArray = Object.values(embedding.data)

    // Save profile data and embedding
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
        embedding: embeddingArray,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving profile:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error in profile API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 