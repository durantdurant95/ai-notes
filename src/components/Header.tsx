import { getUser } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { UserDropdown } from "./UserDropdown";
import { SidebarTrigger } from "./ui/sidebar";

export default async function Header() {
  const user = await getUser();
  return (
    <header className="p-4 flex-1 shadow-md flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <SidebarTrigger />
        <Link href="/" className="flex gap-1">
          <Image
            src="/logo.svg"
            alt="Notes.ai Logo"
            height={36}
            width={36}
            priority
          />
          <h1 className="font-bold text-primary text-lg">notes.ai</h1>
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        {user && (
          <UserDropdown name={user.user_metadata.name} email={user.email} />
        )}
        <ModeToggle />
      </div>
    </header>
  );
}
