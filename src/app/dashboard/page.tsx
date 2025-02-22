import AddNoteButton from "@/components/AddNoteButton";
import NoteForm from "@/components/NoteForm";
import { getNoteById } from "@/utils/supabase/actions/notes";

type DashboardPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const noteIdParam = (await searchParams).noteId;
  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || "";

  if (!noteId) {
    return (
      <div className="flex h-full items-center gap-4 flex-col justify-center">
        <h1 className="font-bold text-xl">
          Start by creating a new note or selecting an existing one
        </h1>
        <AddNoteButton />
      </div>
    );
  }
  const note = await getNoteById(noteId);

  return (
    <NoteForm
      title={note.title || ""}
      content={note.content || ""}
      id={noteId}
    />
  );
}
