"use client";

import { Plus, StickyNote } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// This is sample data. In a real app, you'd fetch this from an API or database.
const sampleNotes = [
  { id: 1, title: "Shopping List", excerpt: "Milk, eggs, bread..." },
  { id: 2, title: "Meeting Notes", excerpt: "Discuss project timeline..." },
  { id: 3, title: "Ideas for Blog", excerpt: "1. How to stay productive..." },
  { id: 4, title: "Books to Read", excerpt: "1. The Alchemist..." },
];

export function AppSidebar() {
  const [notes, setNotes] = React.useState(sampleNotes);
  const [activeNoteId, setActiveNoteId] = React.useState<number | null>(null);

  const addNewNote = () => {
    const newNote = {
      id: notes.length + 1,
      title: `New Note ${notes.length + 1}`,
      excerpt: "Click to edit...",
    };
    setNotes([...notes, newNote]);
    setActiveNoteId(newNote.id);
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border px-2 py-2">
        <h2 className="px-4 text-lg font-semibold tracking-tight">My Notes</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {notes.map((note) => (
            <SidebarMenuItem key={note.id}>
              <SidebarMenuButton
                asChild
                isActive={activeNoteId === note.id}
                onClick={() => setActiveNoteId(note.id)}
              >
                <div className="flex items-center gap-3 px-4">
                  <StickyNote className="h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{note.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {note.excerpt}
                    </span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <Button onClick={addNewNote} className="w-full">
          <Plus />
          Add New Note
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
