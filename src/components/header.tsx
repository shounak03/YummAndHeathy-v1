
"use server"

import { Utensils, User, User2, LogOut } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { createClient } from '@/lib/supabase/server'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogoutButton from './logout-button'


export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-1">
          <Link href={'/'} className="flex items-center gap-1">
            <Utensils className="h-6 w-6 text-orange-500" />
            <span className="text-xl text-orange-500 font-bold">RecipeAI</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button size={"sm"} type='submit' variant={"outline"}
              className={"bg-white text-orange-500 hover:bg-gray-800 hover:text-white"}>
                about
          </Button>
        
        {user !== null ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="relative h-8 w-8 rounded-full overflow-hidden bg-orange-100">
                  {user.user_metadata?.avatar_url ? (
                    <Image
                      src={user?.user_metadata?.avatar_url ?? "/placeholder.png"}
                      alt={user.email || "User avatar"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Image
                      src="/placeholder.png"
                      alt={user.email || "User avatar"}
                      fill
                      className="object-cover"
                    />
                    </div>
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  <User2 className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem> */}
               <DropdownMenuItem asChild>
              <Link href="/api/auth/logout" className="flex w-full items-center text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
      </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="hidden sm:inline-flex text-sm text-black font-medium hover:text-orange-500 transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
        </div>
      </div>
    </header>
  )
}