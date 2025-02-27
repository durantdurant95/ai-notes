"use client";
import { updateNote } from "@/utils/supabase/actions/notes";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type Props = {
  id: string;
  title: string;
  content: string;
};

export default function NoteForm({ id, title, content }: Props) {
  // Track current values in state
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteContent, setNoteContent] = useState(content);

  // Track last saved values to prevent unnecessary saves
  const lastSavedTitle = useRef(title);
  const lastSavedContent = useRef(content);

  // Track if we're editing or just navigating
  const isEditing = useRef(false);

  // Update local state when note changes (navigation between notes)
  useEffect(() => {
    setNoteTitle(title);
    setNoteContent(content);
    lastSavedTitle.current = title;
    lastSavedContent.current = content;
    isEditing.current = false;
  }, [id, title, content]);

  // Debounced save effect with optimizations
  useEffect(() => {
    // Don't save if we're not in edit mode yet
    if (!isEditing.current) return;

    // Don't save if no actual changes
    if (
      noteTitle === lastSavedTitle.current &&
      noteContent === lastSavedContent.current
    ) {
      return;
    }

    const timer = setTimeout(() => {
      updateNote({
        id,
        title: noteTitle,
        content: noteContent,
      })
        .then(() => {
          toast.success("Note saved!");
          // Update last saved values
          lastSavedTitle.current = noteTitle;
          lastSavedContent.current = noteContent;
        })
        .catch(() => toast.error("Failed to save note"));
    }, 1000); // Increased to 1000ms to reduce frequency

    return () => clearTimeout(timer);
  }, [noteTitle, noteContent, id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isEditing.current = true;
    setNoteTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    isEditing.current = true;
    setNoteContent(e.target.value);
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          value={noteTitle}
          onChange={handleTitleChange}
          placeholder="Note Title"
          className="font-semibold"
        />
      </div>
      <Textarea
        value={noteContent}
        onChange={handleContentChange}
        placeholder="Start typing your note here..."
        className="flex-1 resize-none"
      />
    </div>
  );
}
