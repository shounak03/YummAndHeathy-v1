"use client"

import { useState } from 'react'
import { RecipeDisplay } from '@/components/RecipeDisplay'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { ChefHat } from 'lucide-react'

export default function ChatPage() {
  const [ingredient, setIngredient] = useState('')
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
        body: JSON.stringify({ ingredient }),
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
        <h1 className="text-3xl font-bold text-center uppercase mb-2">Welcome chief<br /></h1>
        <div className='flex justify-center'>
          <h3 className='text-xl text-center font-semibold mr-1'>I will be your </h3>
          <ChefHat />
          <h3 className='text-xl text-center font-semibold mb-2'> Chef for today</h3>
        </div>
        <h3 className='text-xl text-center mb-8'>Let me make you some healthy and delicious meal.</h3>


        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder="Add some ingredients of your choice.."
              className="flex-1"
            />

          </div>
          <div className="flex justify-center">

            <Button
              type="submit"
              disabled={isLoading}
              className='cursor-pointer bg-amber-600 hover:bg-amber-700'
            >
              {isLoading ? (
                'Hold up! Let me cook'
              ) : recipes ? (
                `Don't like it? Cook again`
              ) : (
                'Cook'
              )}
            </Button>
          </div>
        </form>

        {recipes && <RecipeDisplay recipes={recipes} />}
      </div>
    </div>
  )
} 