"use server";
import { createClient } from "../server";

export const getNoteById = async (noteId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", noteId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getAllNotesByUserId = async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
