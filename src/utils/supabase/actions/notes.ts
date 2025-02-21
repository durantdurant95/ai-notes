"use server";
import { Tables, TablesInsert } from "@/types/supabase";
import { revalidatePath } from "next/cache";
import { createClient } from "../server";

export const getNoteById = async (noteId: string): Promise<Tables<"notes">> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", noteId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Tables<"notes">;
};

export const getAllNotesByUserId = async (
  userId: string
): Promise<Tables<"notes">[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data as Tables<"notes">[];
};

export const createNote = async (
  note: TablesInsert<"notes">
): Promise<Tables<"notes">> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .insert([note])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  return data as Tables<"notes">;
};
