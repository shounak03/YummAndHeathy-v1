'use client'

import { Utensils } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { signout } from '@/app/auth/actions'
import { toast } from 'sonner'

export default function Header() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const { errorMessage } = await signout()
      if (errorMessage) {
        toast.error(errorMessage)
      } else {
        toast.success('Signed out successfully')
        router.refresh()
      }
    } catch (error) {
      toast.error('An error occurred during sign out')
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-orange-500" />
          <span className="text-xl text-orange-500 font-bold">RecipeAI</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="hidden sm:inline-flex text-sm text-black font-medium hover:text-orange-500 transition-colors"
          >
            Sign In
          </Link>
    
          <Button 
            onClick={handleSignOut}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}
