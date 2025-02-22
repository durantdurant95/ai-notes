"use client";

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
import { deleteNote } from "@/utils/supabase/actions/notes";
import { MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddNoteButton from "./AddNoteButton";
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
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useSidebar();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  useEffect(() => {
    const currentNoteId = pathname.split("/").pop();
    setActiveNoteId(currentNoteId ?? null);
  }, [pathname]);

  const handleNoteClick = (noteId: string) => {
    setActiveNoteId(noteId);
    router.push(`/dashboard/${noteId}`);
  };

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
                <SidebarMenuButton
                  className={`${
                    activeNoteId === note.id ? "bg-primary/5" : ""
                  }`}
                  onClick={() => handleNoteClick(note.id)}
                >
                  <Link
                    className="w-full overflow-hidden whitespace-nowrap text-ellipsis"
                    href={`/dashboard/${note.id}`}
                  >
                    {note.title}
                  </Link>
                  <DropdownMenuTrigger asChild>
                    <MoreHorizontal className="ml-auto" />
                  </DropdownMenuTrigger>
                </SidebarMenuButton>
                <DropdownMenuContent
                  side={isMobile ? "bottom" : "top"}
                  align={isMobile ? "end" : "center"}
                  className="rounded-lg"
                >
                  <DropdownMenuItem
                    onClick={() =>
                      toast.promise(deleteNote(note.id), {
                        loading: "Deleting note...",
                        success: () => {
                          return "Note Deleted!";
                        },
                        error: "Error",
                      })
                    }
                  >
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </SidebarMenuItem>
            </DropdownMenu>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <AddNoteButton />
      </SidebarFooter>
    </Sidebar>
  );
}
