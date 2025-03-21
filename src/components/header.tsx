

import { Utensils } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/auth/action'

export default async function Header() {

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  console.log("user = ",user);


  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-orange-500" />
          <span className="text-xl text-orange-500 font-bold">RecipeAI</span>
        </div>
        {user !== null ? (
          <form action={async () => {
            'use server'
            await logout();
          }}>

            <Button size={"sm"} type='submit' variant={"outline"}
              className={"bg-white text-orange-500 hover:bg-gray-800 hover:text-white"}>
                Logout
            </Button>
          </form>
        ):
        
        (<div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="hidden sm:inline-flex text-sm text-black font-medium hover:text-orange-500 transition-colors"
            >
            Sign In
          </Link>
          </div>
        )}
          
        </div>
    </header>
  )
}
