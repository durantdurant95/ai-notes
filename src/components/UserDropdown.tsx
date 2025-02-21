"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/utils/supabase/actions/auth";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface UserDropdownProps {
  name: string;
  email?: string;
}

export function UserDropdown({ name, email }: UserDropdownProps) {
  const handleSignOut = async () => {
    toast.promise(signOut, {
      loading: "Logging you out...",
      success: () => {
        return "Successfully logged out!";
      },
      error: "Error",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-md font-medium leading-none">{name}</p>
            <p className="text-xs">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem>
            <User />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
