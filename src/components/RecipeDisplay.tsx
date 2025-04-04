import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Recipe {
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

interface RecipeDisplayProps {
  recipes: {
    recipes: Recipe[]
  }
}

export function RecipeDisplay({ recipes }: RecipeDisplayProps) {
  const [savedRecipes, setSavedRecipes] = useState<Set<string>>(new Set())
  const router = useRouter()

  const handleSaveRecipe = async (recipe: Recipe) => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipe }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save recipe')
      }

      const data = await response.json()
      setSavedRecipes(new Set([...savedRecipes, recipe.name]))
      toast.success('Recipe saved successfully!')
      router.push(`/recipes/${data.id}`)
    } catch (error) {
      console.error('Error saving recipe:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to save recipe')
    }
  }

  return (
    <div className="space-y-8 mt-4">
      {recipes.recipes.map((recipe, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">{recipe.name}</CardTitle>
            <CardDescription>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <span>Prep: {recipe.prep_time}</span>
                <span>•</span>
                <span>Cook: {recipe.cook_time}</span>
                <span>•</span>
                <span>Difficulty: {recipe.difficulty}</span>
                <span>•</span>
                <span>Servings: {recipe.servings}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc list-inside space-y-1">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i} className="text-gray-700">{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Instructions</h3>
              <ol className="list-decimal list-inside space-y-2">
                {recipe.instructions.map((instruction, i) => (
                  <li key={i} className="text-gray-700">{instruction}</li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Nutrition Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="font-medium">{recipe.nutrition.calories}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Protein</p>
                  <p className="font-medium">{recipe.nutrition.protein}g</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Carbs</p>
                  <p className="font-medium">{recipe.nutrition.carbs}g</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Fat</p>
                  <p className="font-medium">{recipe.nutrition.fat}g</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Fiber</p>
                  <p className="font-medium">{recipe.nutrition.fiber}g</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Sugar</p>
                  <p className="font-medium">{recipe.nutrition.sugar}g</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Sodium</p>
                  <p className="font-medium">{recipe.nutrition.sodium}mg</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Cost per Serving</p>
                <p className="font-medium">{recipe.cost_per_serving}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Sustainability Score</p>
                <p className="font-medium">{recipe.sustainability_score}/10</p>
              </div>
            </div>
            {recipe.meal_prep_tips && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Meal Prep Tips</h3>
                <ul className="list-disc list-inside space-y-1">
                  {recipe.meal_prep_tips.map((tip, i) => (
                    <li key={i} className="text-gray-700">{tip}</li>
                  ))}
                </ul>
              </div>
            )}
            {recipe.substitutions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Substitutions</h3>
                <ul className="list-disc list-inside space-y-1">
                  {recipe.substitutions.map((sub, i) => (
                    <li key={i} className="text-gray-700">{sub}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => handleSaveRecipe(recipe)}
              disabled={savedRecipes.has(recipe.name)}
            >
              {savedRecipes.has(recipe.name) ? 'Recipe Saved' : 'Save Recipe'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
} 