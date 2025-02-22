import NoteForm from "@/components/NoteForm";
import { getNoteById } from "@/utils/supabase/actions/notes";

type DashboardPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const noteId = (await params).noteId;

  const note = await getNoteById(noteId);

  return <NoteForm title={note.title || ""} content={note.content || ""} />;
}
