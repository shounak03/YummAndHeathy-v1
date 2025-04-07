"use client"
import React from 'react'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner';

function Logout() {
    async function logoutfn() {
        const res = await fetch(`api/auth/logout`)
        console.log(res);
    
        if (!res.ok)
          return toast.error("Logout failed")
        toast.success("User logged out successfully");
        return window.location.reload()
    }
    
  return (
    <Button className="flex w-full items-center bg-green-700 text-white focus:text-red-600"
    
        onClick={logoutfn}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
    </Button>
  )
}

export default Logout