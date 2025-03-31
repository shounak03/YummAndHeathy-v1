"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Send, User, Bot, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  recipes?: Recipe[]
}

interface Recipe {
  id?: string
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

export default function ChatPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.trim()
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate recipes')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: 'Here are your personalized recipe recommendations:',
        timestamp: new Date(),
        recipes: data.recipes
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveRecipe = async (recipe: Recipe) => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      })

      if (!response.ok) {
        throw new Error('Failed to save recipe')
      }

      const data = await response.json()
      router.push(`/recipes/${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save recipe')
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Recipe Assistant</h1>
        <p className="text-gray-600">
          Chat with our AI to get personalized recipe recommendations.
        </p>
      </div>

      <Card className="h-[calc(100vh-12rem)]">
        <CardContent className="p-0 flex flex-col h-full">
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index}>
                  <div
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-orange-600" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === 'user'
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs mt-2 opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                  </div>

                  {message.recipes && (
                    <div className="mt-4 space-y-4">
                      {message.recipes.map((recipe, recipeIndex) => (
                        <Card key={recipeIndex} className="overflow-hidden">
                          <CardContent className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                              <div>Prep Time: {recipe.prep_time}</div>
                              <div>Cook Time: {recipe.cook_time}</div>
                              <div>Difficulty: {recipe.difficulty}</div>
                              <div>Servings: {recipe.servings}</div>
                              <div>Calories: {recipe.nutrition.calories}</div>
                              <div>Protein: {recipe.nutrition.protein}g</div>
                            </div>
                            <Button
                              onClick={() => handleSaveRecipe(recipe)}
                              className="w-full"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save Recipe
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Generating recipes...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for recipe recommendations..."
                className="min-h-[60px] resize-none "
                disabled={isLoading}
              />
              <Button type="submit"  className="bg-orange-400" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4 " />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 