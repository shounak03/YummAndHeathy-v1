import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart2, Calendar, Heart, ShoppingCart, Utensils } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-white">
          <div className="container flex flex-col lg:flex-row items-center gap-8 py-16 md:py-24">
            <div className="flex flex-col gap-4 lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                AI-Powered <span className="text-orange-500">Recipe Generator</span> for Your Kitchen
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                Create personalized recipes based on ingredients you have and dietary preferences you follow. Get
                nutritional analysis, meal plans, and simplified grocery shopping.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Input
                    placeholder="Enter your email"
                    className="pr-32 h-12 border-orange-200 focus-visible:ring-orange-500"
                  />
                  <Button className="absolute right-1 top-1 h-10 bg-orange-500 hover:bg-orange-600">Get Started</Button>
                </div>
              </div>
              <p className="text-sm text-gray-500">Join 10,000+ home chefs already creating amazing meals</p>
            </div>
            <div className="lg:w-1/2">
              <div className="relative h-[400px] w-full lg:h-[500px]">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="AI Recipe Generator Dashboard"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI-powered platform transforms how you plan, cook, and shop for meals
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border border-orange-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <Utensils className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ingredient-Based Recipes</h3>
                <p className="text-gray-600">
                  Generate delicious recipes based on ingredients you already have in your kitchen
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border border-orange-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Nutritional Analysis</h3>
                <p className="text-gray-600">
                  Get detailed breakdown of calories, macros, and micronutrients for every recipe
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border border-orange-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Meal Plans</h3>
                <p className="text-gray-600">
                  Create weekly meal plans tailored to your dietary preferences and nutritional goals
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border border-orange-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <ShoppingCart className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Grocery Lists</h3>
                <p className="text-gray-600">
                  Automatically generate shopping lists based on your selected recipes and meal plans
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 md:py-24 bg-orange-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our simple 3-step process makes meal planning effortless
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm relative">
                <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4">Input Your Ingredients</h3>
                <p className="text-gray-600 mb-4">
                  Tell us what ingredients you have on hand and any dietary restrictions or preferences
                </p>
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Input ingredients"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm relative">
                <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4">AI Generates Recipes</h3>
                <p className="text-gray-600 mb-4">
                  Our AI analyzes thousands of recipes to create personalized options just for you
                </p>
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="AI generates recipes"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm relative">
                <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4">Cook & Enjoy</h3>
                <p className="text-gray-600 mb-4">
                  Follow the step-by-step instructions and enjoy your delicious, personalized meal
                </p>
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Cook and enjoy"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Dietary Preferences */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Dietary preferences"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Supports All <span className="text-orange-500">Dietary Preferences</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Whether you're keto, vegan, gluten-free, or have specific allergies, our AI adapts to your unique
                  needs.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Keto",
                    "Vegan",
                    "Vegetarian",
                    "Paleo",
                    "Gluten-Free",
                    "Dairy-Free",
                    "Low-Carb",
                    "Mediterranean",
                  ].map((diet) => (
                    <div key={diet} className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-orange-500" />
                      <span>{diet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-orange-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join thousands of satisfied users who have transformed their cooking experience
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Busy Parent",
                  quote:
                    "RecipeAI has been a game-changer for our family meals. I can quickly generate healthy recipes based on what's in my fridge, saving time and reducing food waste.",
                },
                {
                  name: "Michael Chen",
                  role: "Fitness Enthusiast",
                  quote:
                    "The nutritional breakdown feature is incredible! I can easily track my macros while enjoying delicious meals that fit my training regimen.",
                },
                {
                  name: "Emma Rodriguez",
                  role: "Home Chef",
                  quote:
                    "I love how the AI suggests creative recipes I would never have thought of. It's expanded my cooking repertoire and impressed my dinner guests!",
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-orange-200 flex items-center justify-center">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-8 md:p-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Cooking Experience?</h2>
                <p className="text-lg mb-8">
                  Join thousands of users who are saving time, reducing food waste, and enjoying delicious, personalized
                  meals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-orange-500 hover:bg-gray-100 h-12 px-8 text-lg">
                    Get Started Free
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-orange-600 h-12 px-8 text-lg">
                    See Pricing
                  </Button>
                </div>
                <p className="text-sm mt-4 opacity-80">No credit card required. Free plan available.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
