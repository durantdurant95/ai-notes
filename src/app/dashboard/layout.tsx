import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex-col">
        <Header />
        <div className="h-[calc(100vh-72px)]">{children}</div>
      </main>
    </SidebarProvider>
  );
}
