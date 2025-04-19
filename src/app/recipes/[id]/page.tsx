"use client"

import { useEffect, useState } from "react"
import { redirect, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Utensils, DollarSign, Leaf, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
interface Recipe {
  id: string
  name: string
  prep_time: string
  cook_time: string
  difficulty: string
  servings: number
  ingredients: string[]
  instructions: string[]
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sugar: number
    sodium: number
  }
  cost_per_serving: string
  sustainability_score: number
  meal_prep_tips: string[]
  substitutions: string[]
}

export default function RecipePage() {
  const params = useParams()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [error, setError] = useState<string | null>(null)
  // const router = useRouter()
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch recipe')
        }
        const data = await response.json()
        setRecipe(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recipe')
      }
    }

    fetchRecipe()
  }, [params.id])

  if (error) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">Loading recipe...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{recipe.name}</CardTitle>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {recipe.prep_time} prep
            </div>
            <div className="flex items-center gap-1">
              <Utensils className="h-4 w-4" />
              {recipe.cook_time} cook
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              {recipe.cost_per_serving}
            </div>
            <div className="flex items-center gap-1">
              <Leaf className="h-4 w-4" />
              {recipe.sustainability_score}/10
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              {recipe.difficulty}
            </div>
            <div className="flex items-center gap-1">
              <span>Servings: {recipe.servings}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Nutrition (per serving)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium">Calories</div>
                <div>{recipe.nutrition.calories}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium">Protein</div>
                <div>{recipe.nutrition.protein}g</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium">Carbs</div>
                <div>{recipe.nutrition.carbs}g</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium">Fat</div>
                <div>{recipe.nutrition.fat}g</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium">Fiber</div>
                <div>{recipe.nutrition.fiber}g</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium">Sugar</div>
                <div>{recipe.nutrition.sugar}g</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium">Sodium</div>
                <div>{recipe.nutrition.sodium}mg</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Instructions</h3>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Meal Prep Tips</h3>
            <ul className="space-y-2">
              {recipe.meal_prep_tips.map((tip, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {recipe.substitutions.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Substitutions</h3>
              <ul className="space-y-2">
                {recipe.substitutions.map((sub, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <div className="flex items-center justify-center">

            <Button className="w-[50%] cursor-pointer bg-green-700 hover:bg-green-900" onClick={()=>{
              redirect('/dashboard')
            }}>back to dashboard</Button>

        </div>
      </Card>
    </div>
  )
} 