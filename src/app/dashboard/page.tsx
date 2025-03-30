"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BarChart3, Calendar, ChevronRight, FlameIcon as Fire, Plus, Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "@/components/ui/chart"

export default function DashboardPage() {
  const router = useRouter()

  // Mock data for the dashboard
  const user = {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    dailyCalorieGoal: 2000,
    dailyProteinGoal: 120,
    dailyCarbsGoal: 200,
    dailyFatGoal: 65,
  }

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const calorieData = [
    { day: "Mon", calories: 1850 },
    { day: "Tue", calories: 2100 },
    { day: "Wed", calories: 1920 },
    { day: "Thu", calories: 2050 },
    { day: "Fri", calories: 1780 },
    { day: "Sat", calories: 2200 },
    { day: "Sun", calories: 1950 },
  ]

  const macroData = [
    { day: "Mon", protein: 95, carbs: 180, fat: 60 },
    { day: "Tue", protein: 110, carbs: 210, fat: 70 },
    { day: "Wed", protein: 100, carbs: 190, fat: 65 },
    { day: "Thu", protein: 115, carbs: 200, fat: 68 },
    { day: "Fri", protein: 90, carbs: 170, fat: 55 },
    { day: "Sat", protein: 120, carbs: 220, fat: 75 },
    { day: "Sun", protein: 105, carbs: 195, fat: 62 },
  ]

  const recipes = [
    {
      id: 1,
      title: "Mediterranean Quinoa Bowl",
      image: "/placeholder.svg?height=200&width=300",
      calories: 450,
      protein: 22,
      carbs: 65,
      fat: 12,
      prepTime: 25,
      tags: ["Vegetarian", "High Protein"],
    },
    {
      id: 2,
      title: "Grilled Chicken with Avocado Salsa",
      image: "/placeholder.svg?height=200&width=300",
      calories: 520,
      protein: 42,
      carbs: 15,
      fat: 28,
      prepTime: 35,
      tags: ["Keto", "High Protein"],
    },
    {
      id: 3,
      title: "Spicy Tofu Stir Fry",
      image: "/placeholder.svg?height=200&width=300",
      calories: 380,
      protein: 18,
      carbs: 45,
      fat: 14,
      prepTime: 20,
      tags: ["Vegan", "Low Calorie"],
    },
    {
      id: 4,
      title: "Salmon with Roasted Vegetables",
      image: "/placeholder.svg?height=200&width=300",
      calories: 490,
      protein: 35,
      carbs: 25,
      fat: 26,
      prepTime: 40,
      tags: ["Paleo", "Omega-3"],
    },
  ]

  // Calculate today's nutrition totals
  const today = calorieData[6]
  const todayMacros = macroData[6]
  const caloriePercentage = Math.round((today.calories / user.dailyCalorieGoal) * 100)
  const proteinPercentage = Math.round((todayMacros.protein / user.dailyProteinGoal) * 100)
  const carbsPercentage = Math.round((todayMacros.carbs / user.dailyCarbsGoal) * 100)
  const fatPercentage = Math.round((todayMacros.fat / user.dailyFatGoal) * 100)

  return (
    <div className="flex min-h-screen flex-col bg-orange-50">

      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Welcome Section */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name.split(" ")[0]}!</h1>
            <p className="text-gray-600">Here's an overview of your nutrition and recipes.</p>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="bg-white border border-orange-100">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="recipes">Recipes</TabsTrigger>
              <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              {/* Today's Summary */}
              <div className="grid gap-6 md:grid-cols-4 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Calories Today</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{today.calories}</div>
                      <Fire className="h-5 w-5 text-orange-500" />
                    </div>
                    <Progress value={caloriePercentage} className="h-2 mt-2" indicatorClassName="bg-orange-500" />
                    <p className="text-xs text-gray-500 mt-1">
                      {caloriePercentage}% of daily goal ({user.dailyCalorieGoal})
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Protein</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{todayMacros.protein}g</div>
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                        P
                      </div>
                    </div>
                    <Progress value={proteinPercentage} className="h-2 mt-2" indicatorClassName="bg-blue-500" />
                    <p className="text-xs text-gray-500 mt-1">
                      {proteinPercentage}% of daily goal ({user.dailyProteinGoal}g)
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Carbs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{todayMacros.carbs}g</div>
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-600">
                        C
                      </div>
                    </div>
                    <Progress value={carbsPercentage} className="h-2 mt-2" indicatorClassName="bg-green-500" />
                    <p className="text-xs text-gray-500 mt-1">
                      {carbsPercentage}% of daily goal ({user.dailyCarbsGoal}g)
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Fat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{todayMacros.fat}g</div>
                      <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-xs font-bold text-yellow-600">
                        F
                      </div>
                    </div>
                    <Progress value={fatPercentage} className="h-2 mt-2" indicatorClassName="bg-yellow-500" />
                    <p className="text-xs text-gray-500 mt-1">
                      {fatPercentage}% of daily goal ({user.dailyFatGoal}g)
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Weekly Charts */}
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Calorie Intake (Past Week)</CardTitle>
                    <CardDescription>Daily calorie consumption</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer data={calorieData} xAxisKey="day" yAxisKey="calories">
                        <ChartGrid />
                        <ChartYAxis />
                        <ChartXAxis />
                        <ChartLineLayer dataKey="calories" curve="linear" className="stroke-orange-500 stroke-2" />
                        <ChartLine
                          className="stroke-orange-500/20 stroke-dasharray-2"
                          strokeWidth={2}
                          y={user.dailyCalorieGoal}
                        />
                        <ChartTooltip>
                          {({ point }) => (
                            <ChartTooltipContent>
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-orange-500" />
                                  <span className="font-medium">{point.day}</span>
                                </div>
                                <div className="text-sm text-gray-500">{point.calories} calories</div>
                              </div>
                            </ChartTooltipContent>
                          )}
                        </ChartTooltip>
                      </ChartContainer>
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
                      <ChartContainer data={macroData} xAxisKey="day" yAxisKey="protein">
                        <ChartGrid />
                        <ChartYAxis />
                        <ChartXAxis />
                        <ChartBarLayer dataKey="protein" className="fill-blue-500" />
                        <ChartBarLayer dataKey="carbs" className="fill-green-500" />
                        <ChartBarLayer dataKey="fat" className="fill-yellow-500" />
                        <ChartTooltip>
                          {({ point }) => (
                            <ChartTooltipContent>
                              <div className="flex flex-col gap-1">
                                <div className="font-medium">{point.day}</div>
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
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="nutrition">
              <div className="text-center py-12">
                <p className="text-gray-500">Detailed nutrition analytics will appear here.</p>
              </div>
            </TabsContent>

            <TabsContent value="recipes">
              <div className="text-center py-12">
                <p className="text-gray-500">All your saved recipes will appear here.</p>
              </div>
            </TabsContent>

            <TabsContent value="meal-plan">
              <div className="text-center py-12">
                <p className="text-gray-500">Your weekly meal plan will appear here.</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Your Recipes */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Your AI-Generated Recipes</h2>
              <Button variant="outline" size="sm" className="text-gray-500">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden">
                  <div className="relative h-40 w-full">
                    <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{recipe.title}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {recipe.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="flex flex-col items-center">
                        <span className="text-gray-500 text-xs">Calories</span>
                        <span className="font-medium">{recipe.calories}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-gray-500 text-xs">Protein</span>
                        <span className="font-medium">{recipe.protein}g</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-gray-500 text-xs">Time</span>
                        <span className="font-medium">{recipe.prepTime}m</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      View Recipe
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Generate New Recipe Button */}
          <div className="flex justify-center">
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg gap-2"
              onClick={() => router.push("/chat")}
            >
              <Plus className="h-5 w-5" />
              Generate New Recipe
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

