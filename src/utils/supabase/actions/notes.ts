"use server";
import { Tables, TablesInsert } from "@/types/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../server";

export const getNoteById = async (noteId: string): Promise<Tables<"notes">> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", noteId)
    .single();

  if (error) {
    redirect("/dashboard");
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
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

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
  // redirect(`/dashboard/${data.id}`);
  return data as Tables<"notes">;
};

export const updateNote = async (
  note: TablesInsert<"notes">
): Promise<Tables<"notes">> => {
  console.log(note);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .update(note)
    .eq("id", note.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length !== 1) {
    throw new Error("No rows returned or multiple rows returned");
  }
  revalidatePath(`/dashboard/${note.id}`);
  return data[0] as Tables<"notes">;
};

export const deleteNote = async (noteId: string): Promise<void> => {
  const supabase = await createClient();
  const { error } = await supabase.from("notes").delete().eq("id", noteId);

  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/dashboard");
};
