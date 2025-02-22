"use client";
import { updateNote } from "@/utils/supabase/actions/notes";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type Props = {
  id: string;
  title: string;
  content: string;
};

export default function NoteForm({ id, title, content }: Props) {
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteContent, setNoteContent] = useState(content);

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Note Title"
          className="font-semibold"
        />
        <Button
          onClick={() =>
            toast.promise(
              updateNote({
                id,
                title: noteTitle,
                content: noteContent,
              }),
              {
                loading: "Saving note...",
                success: () => {
                  return "Note saved!";
                },
                error: "Error",
              }
            )
          }
        >
          Save
        </Button>
      </div>
      <Textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Start typing your note here..."
        className="flex-1 resize-none"
      />
    </div>
  );
}
