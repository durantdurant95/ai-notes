import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 shadow-md">
      <Link href="/" className="flex gap-1">
        <Image
          src="/logo.svg"
          alt="Notes.ai Logo"
          height={36}
          width={36}
          priority
        />
        <h1 className="font-bold text-primary text-xl">notes.ai</h1>
      </Link>
    </header>
  );
}
