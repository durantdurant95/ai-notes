"use client";

import { MoreHorizontal, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tables } from "@/types/supabase";
import { createNote } from "@/utils/supabase/actions/notes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  notes: Tables<"notes">[];
};

export function AppSidebar({ notes }: Props) {
  const isMobile = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader className=" border-b flex justify-center h-[73px]">
        <h2 className="px-1 text-lg font-semibold tracking-tight">My Notes</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="overflow-y-auto py-3 px-1">
          {notes.map((note) => (
            <DropdownMenu key={note.id}>
              <SidebarMenuItem>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    {note.title} <MoreHorizontal className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side={isMobile ? "bottom" : "top"}
                  align={isMobile ? "end" : "center"}
                  className="rounded-lg"
                >
                  <DropdownMenuItem>
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </SidebarMenuItem>
            </DropdownMenu>
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
