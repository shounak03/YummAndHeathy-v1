import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { GoogleGenAI } from "@google/genai";
import { error } from 'console';




export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id
    const { ingredient } = await request.json();
    console.log(ingredient);
    
    if (!userId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }

    // Get user's profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Create a detailed prompt based on user preferences
    const prompt = `You are a professional nutritionist and chef. Generate personalized recipes based on the following user preferences:
      here are some ingrediants the user has added so make user to use these in your recipes - ${ingredient}
      generate only one recipe every request.

      User Profile:
      - Name: ${profile.name || 'User'}
      - Age: ${profile.age || 'Not specified'}
      - Gender: ${profile.gender || 'Not specified'}
      - Current Weight: ${profile.current_weight || 'Not specified'}
      - Target Weight: ${profile.target_weight || 'Not specified'}
      - Dietary Restrictions: ${profile.dietary_restrictions || 'None'}
      - Allergies: ${profile.allergies || 'None'}
      - Dislikes: ${profile.dislikes || 'None'}
      - Primary Goal: ${profile.primary_goal || 'Not specified'}
      - Daily Calorie Intake: ${profile.calorie_intake || 'Not specified'}
      - Macronutrient Preferences: ${JSON.stringify(profile.macronutrient_preferences || {})}
      - Cooking Skill Level: ${profile.cooking_skill_level || 'Not specified'}
      - Time Availability: ${profile.time_availability || 'Not specified'}
      - Kitchen Tools: ${profile.kitchen_tools || 'Not specified'}
      - Meal Types: ${profile.meal_types || 'Not specified'}
      - Cuisine Preferences: ${profile.cuisine_preferences || 'Not specified'}
      - Portion Size: ${profile.portion_size || 'Not specified'}
      - Activity Level: ${profile.activity_level || 'Not specified'}
      - Eating Out Frequency: ${profile.eating_out_frequency || 'Not specified'}
      - Food Budget: ${profile.food_budget || 'Not specified'}
      - Spice Tolerance: ${profile.spice_tolerance || 'Not specified'}
      - Meal Variety: ${profile.meal_variety || 'Not specified'}
      - Sustainability: ${profile.sustainability || 'Not specified'}

        
          

      Please generate a recipes that:
      1. Match the user's dietary restrictions and allergies
      2. Align with their calorie and macronutrient goals
      3. Consider their cooking skill level and available time
      4. Use ingredients that fit their budget
      5. Match their cuisine preferences
      6. Are appropriate for their spice tolerance
      7. Consider sustainability preferences

      For each recipe, provide:
      1. Recipe name
      2. Preparation time
      3. Cooking time
      4. Difficulty level
      5. Servings
      6. Ingredients list with quantities
      7. Step-by-step instructions
      8. Nutritional breakdown per serving:
        - Calories
        - Protein (g)
        - Carbohydrates (g)
        - Fat (g)
        - Fiber (g)
        - Sugar (g)
        - Sodium (mg)
      9. Estimated cost per serving
      10. Sustainability score (1-10)
      11. Tips for meal prep and storage
      12. Possible substitutions for common allergens

      Format the response as a JSON object with the following structure:
      {
        "recipes": [
          {
            "name": "Recipe Name",
            "prep_time": "X minutes",
            "cook_time": "X minutes",
            "difficulty": "Easy/Medium/Hard",
            "servings": X,
            "ingredients": ["ingredient 1", "ingredient 2", ...],
            "instructions": ["step 1", "step 2", ...],
            "nutrition": {
              "calories": X,
              "protein": X,
              "carbs": X,
              "fat": X,
              "fiber": X,
              "sugar": X,
              "sodium": X
            },
            "cost_per_serving": "$X",
            "sustainability_score": X,
            "meal_prep_tips": ["tip 1", "tip 2", ...],
            "substitutions": ["sub 1", "sub 2", ...]
          }
        ]
}`

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });
    console.log("recipe = ", response.text);
    
    const text = response?.text;
    
    if(!text)
      throw error
    // Extract the message part (before the JSON)
    const messageEnd = text.indexOf('```json');
    const message = messageEnd !== -1 ? text.substring(0, messageEnd).trim() : '';
    
    // Extract and clean the JSON part
    let recipes = [];
    const jsonStart = text.indexOf('```json');
    const jsonEnd = text.lastIndexOf('```');
    
    if (jsonStart !== -1 && jsonEnd !== -1) {
      const jsonText = text.substring(jsonStart + '```json'.length, jsonEnd)
        .replace(/```/g, '')
        .trim();
      
      try {
        recipes = JSON.parse(jsonText).recipes;
      } catch (error) {
        console.error('Error parsing recipe JSON:', error);
      }
    }
    
    return NextResponse.json({
      message: message,
      recipes: recipes
    });


  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 501 })
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
    console.error('Error in recipe API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}