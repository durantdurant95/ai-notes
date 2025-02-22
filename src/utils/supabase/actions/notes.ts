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

// export const updateNote = async (
//   note: TablesInsert<"notes">
// ): Promise<Tables<"notes"> | null> => {
//   const supabase = await createClient();
//   console.log("Updating note:", note);

//   // Create an object without the id for the update
//   const { id, ...updateFields } = note;

//   console.log("Update fields:", updateFields);

//   // Check if the note exists before updating
//   const { data: existingNote, error: fetchError } = await supabase
//     .from("notes")
//     .select("*")
//     .eq("id", id);

//   if (fetchError) {
//     console.error("Error fetching note:", fetchError);
//     throw new Error(fetchError.message);
//   }

//   if (!existingNote || existingNote.length === 0) {
//     console.warn("No note found with id:", id);
//     return null; // Handle as needed
//   }

//   const { data, error } = await supabase
//     .from("notes")
//     .update(updateFields) // Only update the fields excluding id
//     .eq("id", id) // Use id to find the correct note
//     .select();

//   console.log("Supabase response:", { data, error });

//   if (error) {
//     console.error("Error updating note:", error);
//     throw new Error(error.message);
//   }

//   if (!data || data.length === 0) {
//     console.warn("No rows updated for id:", id);
//     return null; // Handle as needed
//   }

//   return data[0] as Tables<"notes">;
// };
