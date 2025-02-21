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
import { Tables } from "@/types/supabase";
import { createNote } from "@/utils/supabase/actions/notes";

type Props = {
  notes: Tables<"notes">[];
};

export function AppSidebar({ notes }: Props) {
  const [activeNoteId, setActiveNoteId] = React.useState<string | null>(null);

  return (
    <Sidebar>
      <SidebarHeader className=" border-b flex justify-center h-[73px]">
        <h2 className="px-4 text-lg font-semibold tracking-tight">My Notes</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="overflow-y-auto py-3 px-1">
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
                      {note.content}
                    </span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <Button
          onClick={async () => {
            await createNote({
              title: "New note title",
              content: "this is the content of the note",
            });
          }}
          className="w-full"
        >
          <Plus />
          Add New Note
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
