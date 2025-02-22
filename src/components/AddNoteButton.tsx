"use client";
import { createNote } from "@/utils/supabase/actions/notes";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

type Props = {};

export default function AddNoteButton({}: Props) {
  const router = useRouter();
  return (
    <Button
      onClick={() =>
        toast.promise(
          createNote({
            title: "New note",
            content: "",
          }).then((note) => {
            router.push(`/dashboard/${note.id}`);
          }),
          {
            loading: "Creating note...",
            success: () => {
              return "Created note successfully!";
            },
            error: "Error",
          }
        )
      }
    >
      <Plus />
      Add New Note
    </Button>
  );
}
