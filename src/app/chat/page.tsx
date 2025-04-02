"use client"

import { useState } from 'react'
import { RecipeDisplay } from '@/components/RecipeDisplay'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function ChatPage() {
  const [message, setMessage] = useState('')
  const [recipes, setRecipes] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate recipes')
      }

      const data = await response.json()
      setRecipes(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to generate recipes')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Recipe Generator</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask for personalized recipes..."
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate'}
            </Button>
          </div>
        </form>

        {recipes && <RecipeDisplay recipes={recipes} />}
      </div>
    </div>
  )
} 