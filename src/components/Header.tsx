import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { UserDropdown } from "./UserDropdown";

export default function Header() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  };
  return (
    <header className="p-4 shadow-md flex justify-between items-center">
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
      <div className="flex gap-2 items-center">
        {user ? <UserDropdown user={user} /> : <Link href="/login">Login</Link>}
        <ModeToggle />
      </div>
    </header>
  );
}
