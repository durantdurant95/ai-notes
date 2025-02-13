import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 shadow-md">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Notes.ai Logo"
          height={30}
          width={30}
          priority
        />
      </Link>
    </header>
  );
}
