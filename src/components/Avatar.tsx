// components/Avatar.jsx
"use client";
import { User } from 'lucide-react';
import Image from 'next/image';
interface UserProp{
    user_metadata:{
        avatar_url:string
    }
    email:string
}
interface User{
    
}
export function Avatar({ user }) {

    console.log(user);
    
  return (
    <div className="relative h-8 w-8 rounded-full">
      {user?.user_metadata?.avatar_url ? (
        <Image
          src={user.user_metadata.avatar_url}
          alt={user.email || "User avatar"}
          fill
          className="object-cover"
          unoptimized={true}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}