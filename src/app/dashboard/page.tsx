import { Button } from "@/components/ui/button";
import { getNoteById } from "@/utils/supabase/actions/notes";
import { getUser } from "@/utils/supabase/server";
import { Plus } from "lucide-react";

type DashboardPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const noteIdParam = (await searchParams).noteId;
  const user = getUser();
  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || "";

  if (!noteId) {
    return (
      <div className="flex h-full items-center gap-4 flex-col justify-center">
        <h1 className="font-bold text-xl">
          Start by creating a new note or selecting an existing one
        </h1>
        <Button>
          <Plus />
          Create New Note
        </Button>
      </div>
    );
  }
  const note = await getNoteById(noteId);

  return <div>DashboardPage</div>;
}
