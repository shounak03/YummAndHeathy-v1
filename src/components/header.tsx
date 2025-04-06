
"use server"

import { User2, LogOut, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { headers } from 'next/headers'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  return (
    <header className="relative z-50 code-section" id="sd5zl4">
      <nav className="container mx-auto py-10 hovered-element">
        <div className="flex items-center justify-between relative">
          
          <div className="pl-6 text-xl font-bold flex justify-start">
          <Image
            src={"/diet.png"}
            alt='logo'
            width={35}
            height={35}
            className='mr-2'
            unoptimized = {true}
          />
            <Link href="/" className="text-3xl text-[var(--primary-color)] [font-family:var(--font-family-heading)]">
              <span>Yumm</span>
              <span className="text-[var(--dark-text-color)]">&amp;Healthy</span>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button id="mobile-menu-button" data-collapse-toggle="navigation-menu" type="button" className="pr-6 text-[var(--dark-text-color)] lg:hidden" aria-controls="navigation-menu" aria-expanded="false" aria-label="Navigation Menu">
            <i className="fa-regular fa-bars feather feather-menu" aria-hidden="true"></i>
          </button>
          
          {/* Navigation Menu */}
          <div id="navigation-menu" className="hidden absolute left-0 top-full mt-4 w-full bg-white pb-4 lg:static lg:mt-0 lg:flex flex-1 lg:items-center lg:justify-between lg:bg-transparent lg:pb-0">
            {/* Always maintain a container for navigation links, even if empty */}
            <div className="flex-1 flex justify-center">
              {pathname === "/" && 
                <ul className="flex flex-col lg:px-6 lg:flex-row flex-1 lg:justify-center lg:items-center lg:space-y-0 lg:space-x-8">
                  <li className="flex items-center p-2 border-t border-gray-200 md:border-t-transparent md:p-0">
                    <a href="/about-us" className="text-[var(--dark-text-color)]">About</a>
                  </li>
                  <li className="flex items-center p-2 border-t border-gray-200 md:border-t-transparent md:p-0">
                    <div className="group relative">
                      <Link href={'#features'} className="flex w-full cursor-pointer flex-row items-center gap-1 text-[var(--dark-text-color)] lg:justify-center">
                        <span className="">Features</span>
                        <i className="fa-regular fa-chevron-down ml-1 transition-['rotate'] lg:group-hover:rotate-[180deg]" aria-hidden="true"></i>
                      </Link>
                      <div className="left-0 top-full z-50 hidden w-full text-black lg:absolute lg:w-[260px] lg:pt-2 lg:group-hover:block">
                        <div className="mt-2 bg-white p-1.5 lg:rounded-lg lg:border lg:border-gray-200 lg:shadow-sm">
                          <Link className="block cursor-pointer border-b border-solid px-3 py-1.5 hover:bg-[#1900410a] lg:py-3 lg:font-medium" href="#features">Features</Link>
                          <Link className="block cursor-pointer px-3 py-1.5 hover:bg-[#1900410a] lg:py-3 lg:font-medium" href="#working">How It Works</Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-center p-2 border-t border-gray-200 md:border-t-transparent md:p-0">
                    <Link href="#plans" className="text-[var(--dark-text-color)]">Plans</Link>
                  </li>
                </ul>
              }
            </div>
            
            {/* Auth Section - Always aligned to the right */}
            <div className="flex flex-col mt-4 lg:flex-row items-center lg:justify-end lg:ml-4 space-y-4 lg:mt-0 lg:space-y-0 lg:space-x-4 text-sm lg:text-base">
              {!user ? (
                <>
                  <Link href="/auth/login" className="px-4 py-2 text-[var(--dark-text-color)]">Log In</Link>
                  <Link href="/auth/signup" className="rounded bg-[var(--primary-button-bg-color)] px-4 py-2 text-[var(--primary-button-text-color)] hover:bg-[var(--primary-button-hover-bg-color)]">Sign Up</Link>
                </>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Image src={user.user_metadata.avatar_url || '/placeholder.png'}
                      alt='icon'
                      height={40}
                      width={40}
                      className='rounded-3xl cursor-pointer'
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.user_metadata?.name || "User"}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
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
                    <DropdownMenuItem asChild>
                      <Link href="/api/auth/logout" className="flex w-full items-center text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}