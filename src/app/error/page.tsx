import { Button } from "@/components/ui/button";
import { CloudAlert, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md">
        <CloudAlert
          className="mx-auto mb-4 h-16 w-16 text-red-600"
          aria-hidden="true"
        />
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Oops! Something went wrong
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          We are working on fixing it. Please try again.
        </p>
        <Button asChild>
          <Link href="/">
            <Home aria-hidden="true" />
            Go home
          </Link>
        </Button>
      </div>
    </main>
  );
}
