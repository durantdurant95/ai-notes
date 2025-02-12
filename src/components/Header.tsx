import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <Link href="/">
        <Image src="/logo.svg" alt="Notes.ai Logo" height={30} width={30} />
      </Link>
    </header>
  );
}
