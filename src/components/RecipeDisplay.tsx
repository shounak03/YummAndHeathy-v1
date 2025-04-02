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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recipes.recipes.map((recipe, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <CardTitle>{recipe.name}</CardTitle>
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
          <CardContent className="flex-1">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Ingredients</h3>
                <ul className="list-disc list-inside space-y-1">
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Instructions</h3>
                <ol className="list-decimal list-inside space-y-1">
                  {recipe.instructions.map((instruction, i) => (
                    <li key={i}>{instruction}</li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Nutritional Information</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>Calories: {recipe.nutrition.calories}</div>
                  <div>Protein: {recipe.nutrition.protein}g</div>
                  <div>Carbs: {recipe.nutrition.carbs}g</div>
                  <div>Fat: {recipe.nutrition.fat}g</div>
                  <div>Fiber: {recipe.nutrition.fiber}g</div>
                  <div>Sugar: {recipe.nutrition.sugar}g</div>
                  <div>Sodium: {recipe.nutrition.sodium}mg</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Meal Prep Tips</h3>
                <ul className="list-disc list-inside space-y-1">
                  {recipe.meal_prep_tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
              {recipe.substitutions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Substitutions</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {recipe.substitutions.map((sub, i) => (
                      <li key={i}>{sub}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Cost per serving: {recipe.cost_per_serving}
              <br />
              Sustainability score: {recipe.sustainability_score}/10
            </div>
            <Button
              variant={savedRecipes.has(recipe.name) ? "secondary" : "default"}
              onClick={() => handleSaveRecipe(recipe)}
              disabled={savedRecipes.has(recipe.name)}
            >
              {savedRecipes.has(recipe.name) ? "Saved" : "Save Recipe"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
} 