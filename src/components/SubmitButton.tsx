"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

import { ReactNode } from "react";

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="cursor-pointer">
      {pending ? <Loader className="animate-spin" /> : children}
    </Button>
  );
}
