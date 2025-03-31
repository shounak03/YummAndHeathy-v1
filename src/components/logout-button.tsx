

import { LogOut } from 'lucide-react'
import { logout } from '@/app/auth/action'

export default function LogoutButton() {
  return (
    <form action={async() =>{
        "use server"
        await logout()
    }}>
      <button 
        className="flex w-full items-center text-red-600 focus:text-red-600" 
        type="submit"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </button>
    </form>
  )
}