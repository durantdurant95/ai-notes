import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getAllNotesByUserId } from "@/utils/supabase/actions/notes";
import { getUser } from "@/utils/supabase/server";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    return <div>User not found</div>;
  }
  const notes = await getAllNotesByUserId(user.id);
  return (
    <SidebarProvider>
      <AppSidebar notes={notes} />
      <main className="flex-1 flex-col">
        <Header />
        <div className="h-[calc(100vh-72px)]">{children}</div>
      </main>
    </SidebarProvider>
  );
}
