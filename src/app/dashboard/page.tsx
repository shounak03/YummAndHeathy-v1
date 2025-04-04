"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { ChevronRight, Plus } from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ChartContainer,
  ChartGrid,
  ChartLine,
  ChartLineLayer,
  ChartTooltip,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis,
  ChartBarLayer,
} from '@/components/ui/chart'

import { fetchUser } from '../auth/action'

interface SavedRecipe {
  id: string
  recipe_data: {
    name: string
    prep_time: string
    cook_time: string
    difficulty: string
    servings: number
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
  }
  created_at: string
}

interface DailyNutrition {
  date: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface ChartPoint {
  date: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export default function DashboardPage() {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([])
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching user data...')
        const userResponse = await fetchUser()
        console.log("User response:", userResponse)

        

        if (!userResponse || !userResponse.data?.user) {
          console.error('No user found')
          setError('Authentication required')
          setIsLoading(false)
          return
        }

        const user = userResponse.data.user
        setUserId(user.id)
        console.log('User ID set:', user.id)

        console.log('Fetching profile...')
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError) {
          console.error('Profile error:', profileError)
          setError('Error fetching profile')
          setIsLoading(false)
          return
        }

        setUserProfile(profile)
        console.log('Profile fetched:', profile)

        console.log('Fetching saved recipes...')
        const { data: recipes, error: recipesError } = await supabase
          .from('saved_recipes')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (recipesError) {
          console.error('Recipes error:', recipesError)
          setError('Error fetching recipes')
          setIsLoading(false)
          return
        }

        console.log('Recipes fetched:', recipes)
        if (recipes) {
          setSavedRecipes(recipes)

          // Calculate daily nutrition for the past 7 days
          const today = new Date()
          const sevenDaysAgo = new Date(today)
          sevenDaysAgo.setDate(today.getDate() - 7)

          const dailyData: { [key: string]: DailyNutrition } = {}
          
          recipes.forEach((recipe: SavedRecipe) => {
            const recipeDate = new Date(recipe.created_at)
            if (recipeDate >= sevenDaysAgo) {
              const dateKey = recipeDate.toISOString().split('T')[0]
              if (!dailyData[dateKey]) {
                dailyData[dateKey] = {
                  date: dateKey,
                  calories: 0,
                  protein: 0,
                  carbs: 0,
                  fat: 0
                }
              }
              
              const nutrition = recipe.recipe_data.nutrition
              dailyData[dateKey].calories += nutrition.calories
              dailyData[dateKey].protein += nutrition.protein
              dailyData[dateKey].carbs += nutrition.carbs
              dailyData[dateKey].fat += nutrition.fat
            }
          })

          // Convert to array and sort by date
          const nutritionArray = Object.values(dailyData)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          
          setDailyNutrition(nutritionArray)
          console.log('Daily nutrition calculated:', nutritionArray)
        }

        setIsLoading(false)
      } catch (err) {
        console.error('Unexpected error:', err)
        setError('An unexpected error occurred')
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // Calculate today's nutrition totals
  const today = new Date().toISOString().split('T')[0]
  const todayNutrition = dailyNutrition.find(d => d.date === today) || {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  }

  const caloriePercentage = userProfile?.calorie_intake 
    ? Math.round((todayNutrition.calories / userProfile.calorie_intake) * 100)
    : 0

  const proteinPercentage = userProfile?.macronutrient_preferences?.protein
    ? Math.round((todayNutrition.protein / userProfile.macronutrient_preferences.protein) * 100)
    : 0

  const carbsPercentage = userProfile?.macronutrient_preferences?.carbs
    ? Math.round((todayNutrition.carbs / userProfile.macronutrient_preferences.carbs) * 100)
    : 0

  const fatPercentage = userProfile?.macronutrient_preferences?.fat
    ? Math.round((todayNutrition.fat / userProfile.macronutrient_preferences.fat) * 100)
    : 0

  // Add this function to format the data for charts
  const formatChartData = (data: DailyNutrition[]): ChartPoint[] => {
    return data.map(item => ({
      date: item.date,
      calories: item.calories || 0,
      protein: item.protein || 0,
      carbs: item.carbs || 0,
      fat: item.fat || 0
    }))
  }

  return (
    <div className="flex min-h-screen flex-col bg-orange-50">
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Welcome Section */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold mb-2">Welcome back, {userProfile?.name?.split(" ")[0]}!</h1>
            <p className="text-gray-600">Here's an overview of your nutrition and recipes.</p>
          </div>

        
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="overview" className="mb-8">
            <div defaultValue="overview" className=" flex justify-center">
              <TabsList className="bg-white border border-orange-100 flex justify-center">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="recipes">Recipes</TabsTrigger>
              </TabsList>
            </div>

              <TabsContent value="overview" className="mt-6">
                {/* Today's Summary */}
                <div className="grid gap-6 md:grid-cols-4 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Calories Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{todayNutrition.calories}</div>
                        <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-orange-600">C</span>
                        </div>
                      </div>
                      <Progress value={caloriePercentage} className="h-2 mt-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        {caloriePercentage}% of daily goal ({userProfile?.calorie_intake || 0})
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Protein</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{todayNutrition.protein}g</div>
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">P</span>
                        </div>
                      </div>
                      <Progress value={proteinPercentage} className="h-2 mt-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        {proteinPercentage}% of daily goal ({userProfile?.macronutrient_preferences?.protein || 0}g)
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Carbs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{todayNutrition.carbs}g</div>
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-green-600">C</span>
                        </div>
                      </div>
                      <Progress value={carbsPercentage} className="h-2 mt-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        {carbsPercentage}% of daily goal ({userProfile?.macronutrient_preferences?.carbs || 0}g)
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Fat</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{todayNutrition.fat}g</div>
                        <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-yellow-600">F</span>
                        </div>
                      </div>
                      <Progress value={fatPercentage} className="h-2 mt-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        {fatPercentage}% of daily goal ({userProfile?.macronutrient_preferences?.fat || 0}g)
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Weekly Charts */}
                {/* <div className="grid gap-6 md:grid-cols-2 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Calorie Intake (Past Week)</CardTitle>
                      <CardDescription>Daily calorie consumption</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        {dailyNutrition && dailyNutrition.length > 0 ? (
                          <ChartContainer 
                            data={formatChartData(dailyNutrition)} 
                            xAxisKey="date" 
                            yAxisKey="calories"
                          >
                            <ChartGrid />
                            <ChartYAxis />
                            <ChartXAxis />
                            <ChartLineLayer 
                              dataKey="calories" 
                              curve="linear" 
                              className="stroke-orange-500 stroke-2" 
                            />
                            <ChartLine
                              className="stroke-orange-500/20 stroke-dasharray-2"
                              strokeWidth={2}
                              y={userProfile?.calorie_intake || 0}
                            />
                            <ChartTooltip>
                              {({ point }: { point: ChartPoint }) => (
                                <ChartTooltipContent>
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                      <div className="h-2 w-2 rounded-full bg-orange-500" />
                                      <span className="font-medium">{point.date}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">{point.calories} calories</div>
                                  </div>
                                </ChartTooltipContent>
                              )}
                            </ChartTooltip>
                          </ChartContainer>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">No data available for the past week</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Macronutrient Breakdown</CardTitle>
                      <CardDescription>Protein, carbs, and fat distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        {dailyNutrition && dailyNutrition.length > 0 ? (
                          <ChartContainer 
                            data={formatChartData(dailyNutrition)} 
                            xAxisKey="date" 
                            yAxisKey="protein"
                          >
                            <ChartGrid />
                            <ChartYAxis />
                            <ChartXAxis />
                            <ChartBarLayer dataKey="protein" className="fill-blue-500" />
                            <ChartBarLayer dataKey="carbs" className="fill-green-500" />
                            <ChartBarLayer dataKey="fat" className="fill-yellow-500" />
                            <ChartTooltip>
                              {({ point }: { point: ChartPoint }) => (
                                <ChartTooltipContent>
                                  <div className="flex flex-col gap-1">
                                    <div className="font-medium">{point.date}</div>
                                    <div className="flex items-center gap-2">
                                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                                      <span className="text-sm text-gray-500">Protein: {point.protein}g</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="h-2 w-2 rounded-full bg-green-500" />
                                      <span className="text-sm text-gray-500">Carbs: {point.carbs}g</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                      <span className="text-sm text-gray-500">Fat: {point.fat}g</span>
                                    </div>
                                  </div>
                                </ChartTooltipContent>
                              )}
                            </ChartTooltip>
                          </ChartContainer>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">No data available for the past week</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div> */}
              </TabsContent>

              <TabsContent value="nutrition" className="mt-6">
                <div className="text-center py-12">
                  <p className="text-gray-500">Detailed nutrition analytics will appear here.</p>
                </div>
              </TabsContent>

              <TabsContent value="recipes" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {savedRecipes.length > 0 ? (
                    savedRecipes.map((recipe) => (
                      <Card key={recipe.id} className="flex flex-col">
                        <CardHeader>
                          <CardTitle>{recipe.recipe_data.name}</CardTitle>
                          <CardDescription>
                            <div className="flex gap-2 text-sm text-muted-foreground">
                              <span>Prep: {recipe.recipe_data.prep_time}</span>
                              <span>•</span>
                              <span>Cook: {recipe.recipe_data.cook_time}</span>
                              <span>•</span>
                              <span>Difficulty: {recipe.recipe_data.difficulty}</span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>Calories: {recipe.recipe_data.nutrition.calories}</div>
                            <div>Protein: {recipe.recipe_data.nutrition.protein}g</div>
                            <div>Carbs: {recipe.recipe_data.nutrition.carbs}g</div>
                            <div>Fat: {recipe.recipe_data.nutrition.fat}g</div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link href={`/recipes/${recipe.id}`}>
                              View Recipe <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No saved recipes yet</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Generate New Recipe Button */}
          <div className="flex justify-center mt-8">
            <Link href="/chat">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg gap-2">
                <Plus className="h-5 w-5" />
                Generate New Recipe
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

